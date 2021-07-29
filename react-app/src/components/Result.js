import React from 'react';
import { Accordion } from 'react-bootstrap';
import _ from 'lodash';
import fhirpath from 'fhirpath';
import getLabel from './patientUtils';

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

  function getLabelJSX() {
    return <p className="accordion-result-label">{getLabel(props.bundle, props.id)}</p>;
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
        {getLabelJSX()}
      </Accordion.Header>
      <Accordion.Body>
        <p className="emphasized-list-text">Total Resources: {getNumResources(resourceList)}</p>
        {getFormattedList(resourceList)}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Result;
