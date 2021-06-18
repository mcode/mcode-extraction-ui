import React from 'react';
import ReactJson from 'react-json-view';

function PatientData(props) {
  return (
    <div>
      {props.id === null && (
        <div className="page-text">
          <p>Select a patient to view their information.</p>
        </div>
      )}
      {props.id !== null && (
        <div className="patient-json-display">
          <ReactJson src={props.patientJson} collapsed={3} />
        </div>
      )}
    </div>
  );
}

export default PatientData;
