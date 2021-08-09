import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Form from '@rjsf/core';
import { uiSchema, widgets, fields } from './schemaFormUtils';

function ConfigForm(props) {
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function onSaveAs() {
    window.api
      .saveConfigAs(props.configJSON)
      .then((result) => {
        if (result !== null) {
          // if saveOutput() returns true, then the save process succeeded
          setShowSavedAlert(true);
          setSavedMessage('Files saved to '.concat(result));
        }
        // If result is null, the process was cancelled, and nothing should be done.
      })
      .catch((error) => {
        setShowErrorAlert(true);
        setErrorMessage(error.message);
        setShowSavedAlert(false);
      });
  }
  function onBack() {
    props.setShowForm(false);
  }

  return (
    <div className="flex-space-between-container">
      <p className="page-text text-centered">The config editor form will display here.</p>
      <div className="form-container">
        <Form schema={props.schema} uiSchema={uiSchema} widgets={widgets} fields={fields} />
      </div>
      {showSavedAlert && (
        <Alert variant="success" show={showSavedAlert} onClose={() => setShowSavedAlert(false)} dismissible>
          <Alert.Heading>Files saved</Alert.Heading>
          <p>{savedMessage}</p>
        </Alert>
      )}
      {showErrorAlert && (
        <Alert variant="danger" show={showErrorAlert} onClose={() => setShowErrorAlert(false)} dismissible>
          <Alert.Heading>Error: Unable to save file</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
      {!showSavedAlert && !showErrorAlert && (
        <div className="nav-button-container">
          <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onBack}>
            Back
          </Button>
          <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onSaveAs}>
            Save As
          </Button>
        </div>
      )}
    </div>
  );
}

export default ConfigForm;
