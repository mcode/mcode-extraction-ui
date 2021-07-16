import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { Alert } from 'react-bootstrap';
import LogList from './LogList';
import SaveOutputForm from './SaveOutputForm';

function PatientData(props) {
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNoFilesAlert, setShowNoFilesAlert] = useState(false);

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
          setShowSavedAlert={setShowSavedAlert}
          setShowErrorAlert={setShowErrorAlert}
          setErrorMessage={setErrorMessage}
          setShowNoFilesAlert={setShowNoFilesAlert}
        />
      )}
      {showSavedAlert && (
        <Alert variant="success" show={showSavedAlert} onClose={() => setShowSavedAlert(false)} dismissible>
          <Alert.Heading>Files saved</Alert.Heading>
        </Alert>
      )}
      {showErrorAlert && (
        <Alert variant="danger" show={showErrorAlert} onClose={() => setShowErrorAlert(false)} dismissible>
          <Alert.Heading>Error: Unable to save file(s)</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
      {showNoFilesAlert && (
        <Alert variant="warning" show={showNoFilesAlert} onClose={() => setShowNoFilesAlert(false)} dismissible>
          <Alert.Heading>Error: No patient data to save</Alert.Heading>
        </Alert>
      )}
    </div>
  );
}

export default PatientData;
