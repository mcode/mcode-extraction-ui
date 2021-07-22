import React from 'react';
import ReactJson from 'react-json-view';
import LogList from './LogList';
import SaveOutputForm from './SaveOutputForm';

function OutputDisplay(props) {
  return (
    <div>
      {props.id === null && !props.showLogs && !props.showSaveForm && (
        <p className="page-text padding-100">
          Select a patient to view their information or click on "Log File" to view the logger messages.
        </p>
      )}
      {props.showLogs && !props.showSaveForm && (
        <div>
          <h3 className="page-subtitle sticky-item">Log File</h3>
          <LogList loggedMessages={props.loggedMessages} listType="log-list-result-page" />
        </div>
      )}
      {props.id !== null && !props.showLogs && !props.showSaveForm && (
        <div className="patient-json-display">
          <ReactJson src={props.patientJson} collapsed={4} />
        </div>
      )}
      {props.showSaveForm && (
        <SaveOutputForm
          extractedData={props.extractedData}
          setShowSaveForm={props.setShowSaveForm}
          loggedMessages={props.loggedMessages}
        />
      )}
    </div>
  );
}

export default OutputDisplay;
