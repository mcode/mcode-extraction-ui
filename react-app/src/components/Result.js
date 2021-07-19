import React from 'react';
import { Accordion } from 'react-bootstrap';
import _ from 'lodash';
import fhirpath from 'fhirpath';

function Result(props) {
  function countResources() {
    const resourceList = [];
    const allResourceTypesPath = 'Bundle.descendants().resource.resourceType';
    const uniqueResourceTypes = _.uniq(fhirpath.evaluate(props.bundle, allResourceTypesPath));

    uniqueResourceTypes.forEach((resourceType) => {
      const count = fhirpath.evaluate(
        props.bundle,
        `Bundle.descendants().where(resource.resourceType = '${resourceType}').count()`,
      );
      resourceList.push({ resourceType, count });
    });

    return _.sortBy(resourceList, ['resourceType', 'count']);
  }

  function getFormattedList(resourceList) {
    return resourceList.map((item) => (
      <p key={item.resourceType}>
        {item.resourceType}: {item.count}
      </p>
    ));
  }

  function getNumResources(resourceList) {
    let total = 0;
    resourceList.forEach((item) => {
      total += parseInt(item.count, 10);
    });
    return total;
  }

  function getLabel() {
    // attempt to get MRN and name with fhirpath
    const patient = fhirpath.evaluate(props.bundle, "Bundle.descendants().resource.where(resourceType='Patient')")[0];
    if (patient) {
      const mrn = patient.id;
      const name = patient.name[0].text;

      const isMasked = fhirpath.evaluate(patient, 'Patient.identifier.extension.valueCode')[0] === 'masked';

      // if both MRN and name -- return string w / both
      if (typeof mrn === 'string' && mrn.length > 0 && typeof name === 'string' && name.length > 0 && !isMasked) {
        const label = mrn.concat(': ').concat(name);
        return <p className="accordion-result-label">{label}</p>;
      }
      // if either MRN or name -- return string / the available one
      if (typeof name === 'string' && name.length > 0) {
        return <p className="accordion-result-label">{name}</p>;
      }
      // if neither MRN nor name -- "Patient " + patient_resource_id
      if (typeof mrn === 'string' && mrn.length > 0) {
        return <p className="accordion-result-label">{mrn}</p>;
      }
    }

    // if no patient resource ID -- return "Patient " + props.id
    let label = 'Patient';
    label = label.concat(' ').concat(props.id.toString());
    return <p className="accordion-result-label">{label}</p>;
  }

  const resourceList = countResources();

  return (
    <Accordion.Item eventKey={props.id}>
      <Accordion.Header
        onClick={() => {
          props.setPatientID(props.id);
          props.setShowLogs(false);
          props.setShowSaveForm(false);
        }}
      >
        {getLabel()}
      </Accordion.Header>
      <Accordion.Body>
        <p className="emphasized-list-text">Total Resources: {getNumResources(resourceList)}</p>
        {getFormattedList(resourceList)}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Result;
