import React from 'react';
import ReactJson from 'react-json-view';
import LogList from './LogList';
import SaveOutputForm from './SaveOutputForm';

function OutputDisplay(props) {
  return (
    <>
      {props.id === null && !props.showLogs && !props.showSaveForm && (
        <p className="page-text text-centered padding-100">
          Select a patient to view their information or click on "Logger Messages" to view the logger messages.
        </p>
      )}
      {props.showLogs && !props.showSaveForm && (
        <div>
          <LogList loggedMessages={props.loggedMessages} listType="log-list-result-page" />
        </div>
      )}
      {props.id !== null && !props.showLogs && !props.showSaveForm && (
        <ReactJson src={props.patientJson} collapsed={4} />
      )}
      {props.showSaveForm && (
        <SaveOutputForm
          extractedData={props.extractedData}
          setShowSaveForm={props.setShowSaveForm}
          loggedMessages={props.loggedMessages}
        />
      )}
    </>
  );
}

export default OutputDisplay;
