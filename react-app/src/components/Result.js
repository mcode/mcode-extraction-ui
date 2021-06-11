import React from 'react';
import { ListGroup } from 'react-bootstrap';

import '../stylesheets/Home.css';

function Result(props) {
  function onSelectPatient(e) {
    props.setPatientID(parseInt(e.target.id, 10));
  }

  return (
    <ListGroup.Item action onClick={onSelectPatient} eventKey={props.id} id={props.id}>
      Patient {props.id}
    </ListGroup.Item>
  );
}

export default Result;
