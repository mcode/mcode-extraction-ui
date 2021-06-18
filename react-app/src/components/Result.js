import React from 'react';
import { Accordion } from 'react-bootstrap';

function Result(props) {
  return (
    <Accordion.Item eventKey={props.id}>
      <Accordion.Header
        onClick={() => {
          props.setPatientID(props.id);
        }}
      >
        Patient {props.id}
      </Accordion.Header>
    </Accordion.Item>
  );
}

export default Result;

// <ListGroup.Item action onClick={onSelectPatient} eventKey={props.id} id={props.id} variant="secondary">
//  Patient {props.id}
// </ListGroup.Item>;