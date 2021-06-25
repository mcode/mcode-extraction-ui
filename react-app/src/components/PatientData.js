import React from 'react';
import ReactJson from 'react-json-view';
import LogList from './LogList';

function PatientData(props) {
  return (
    <div>
      {props.id === null && !props.showLogs && (
        <p className="page-text padding-100">
          Select a patient to view their information or click on "Log File" to view the logger messages.
        </p>
      )}
      {props.showLogs && (
        <div>
          <h3 className="page-subtitle sticky-item">Log File</h3>
          <LogList loggedMessages={props.loggedMessages} listType="log-list-result-page" />
        </div>
      )}
      {props.id !== null && !props.showLogs && (
        <div className="patient-json-display">
          <ReactJson src={props.patientJson} collapsed={3} />
        </div>
      )}
    </div>
  );
}

export default PatientData;
