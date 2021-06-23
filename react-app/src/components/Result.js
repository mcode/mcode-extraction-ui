import React from 'react';
import { Accordion } from 'react-bootstrap';

function Result(props) {
  return (
    <Accordion.Item eventKey={props.id}>
      <Accordion.Header
        onClick={() => {
          props.setPatientID(props.id);
          props.setShowLogs(false);
        }}
      >
        Patient {props.id}
      </Accordion.Header>
    </Accordion.Item>
  );
}

export default Result;
