import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ReactJson from 'react-json-view';

import '../stylesheets/LogFile.scss';

function PatientData(props) {
  const list = props.loggedMessages.map((message) => (
    <ListGroup.Item className="log-message">{message}</ListGroup.Item>
  ));
  return (
    <div>
      {props.id === null && (
        <div className="page-text">
          <p>Select a patient to view their information.</p>
        </div>
      )}
      {props.id !== null && props.id === -1 && (
        <div>
          <h3 className="page-subtitle">Log File</h3>
          <ListGroup>{list}</ListGroup>
        </div>
      )}
      {props.id !== null && props.id >= 0 && (
        <div className="patient-json-display">
          <ReactJson src={props.patientJson} collapsed={3} />
        </div>
      )}
    </div>
  );
}

export default PatientData;
