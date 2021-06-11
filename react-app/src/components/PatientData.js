import React from 'react';
import ReactJson from 'react-json-view';

function PatientData(props) {
  return (
    <div>
      {props.id < 0 && (
        <div>
          <p>Select a patient to view their information.</p>
        </div>
      )}
      {props.id >= 0 && (
        <div>
          <h3 className="page-subtitle">Patient {props.id}</h3>
          <ReactJson src={props.patientJson} />
        </div>
      )}
    </div>
  );
}

export default PatientData;
