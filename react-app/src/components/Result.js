import React from 'react';
import { Accordion } from 'react-bootstrap';

const _ = require('lodash');
const fhirpath = require('fhirpath');

function Result(props) {
  function getResourceList() {
    const resourceList = [];
    // iterate through resources array, checking the resourceType of each entry
    // if (new type),

    const allResourceTypesPath = 'Bundle.descendants().resource.resourceType';
    const uniqueResourceTypes = _.uniq(fhirpath.evaluate(props.bundle, allResourceTypesPath));

    let totalResources = 0;
    // FIXME - sort uniqueResourceTypes alphabetically

    const countThisResource = (resourceType) =>
      `Bundle.descendants().where(resource.resourceType = '${resourceType}').count()`;
    uniqueResourceTypes.forEach((resourceType) => {
      const count = fhirpath.evaluate(props.bundle, countThisResource(resourceType));
      resourceList.push({ resourceType, count });
      totalResources += parseInt(count, 10);
    });

    let sortedList = [{ resourceType: 'Total Resources', count: totalResources }];
    sortedList = sortedList.concat(_.sortBy(resourceList, ['resourceType', 'count']));

    return sortedList.map((item, i) => (
      <p key={i}>
        {item.resourceType}: {item.count}
      </p>
    ));
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
      <Accordion.Body>{getResourceList()}</Accordion.Body>
    </Accordion.Item>
  );
}

export default Result;
