import React from 'react';
import ReactJson from 'react-json-view';
import LogList from './LogList';

function PatientData(props) {
  return (
    <div>
      {props.id === null && !props.showLogs && (
        <div className="page-text">
          <p>Select a patient to view their information or click on "Log File" to view the logger messages.</p>
        </div>
      )}
      {props.showLogs && (
        <div>
          <h3 className="page-subtitle sticky-item">Log File</h3>
          <LogList loggedMessages={props.loggedMessages} />
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
