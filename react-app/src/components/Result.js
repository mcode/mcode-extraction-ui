import React from 'react';
import { Accordion } from 'react-bootstrap';

const _ = require('lodash');
const fhirpath = require('fhirpath');

function Result(props) {
  function countResources() {
    const resourceList = [];
    // iterate through resources array, checking the resourceType of each entry
    // if (new type),

    const allResourceTypesPath = 'Bundle.descendants().resource.resourceType';
    const uniqueResourceTypes = _.uniq(fhirpath.evaluate(props.bundle, allResourceTypesPath));

    const countThisResource = (resourceType) =>
      `Bundle.descendants().where(resource.resourceType = '${resourceType}').count()`;
    uniqueResourceTypes.forEach((resourceType) => {
      const count = fhirpath.evaluate(props.bundle, countThisResource(resourceType));
      resourceList.push({ resourceType, count });
    });

    return _.sortBy(resourceList, ['resourceType', 'count']);
  }

  function getResourceList() {
    const resourceList = countResources();
    return resourceList.map((item, i) => (
      <p key={i}>
        {item.resourceType}: {item.count}
      </p>
    ));
  }

  function getNumResources() {
    let total = 0;
    countResources().forEach((item) => {
      total += parseInt(item.count, 10);
    });
    return total;
  }

  return (
    <Accordion.Item eventKey={props.id}>
      <Accordion.Header
        onClick={() => {
          props.setPatientID(props.id);
          props.setShowLogs(false);
        }}
      >
        Patient {props.id + 1}
      </Accordion.Header>
      <Accordion.Body>
        {getResourceList()}
        <p className="emphasized-list-text">Total Resources: {getNumResources()}</p>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Result;
