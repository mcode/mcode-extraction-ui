import React from 'react';
import { Button } from 'react-bootstrap';

function SaveOutputForm(props) {
  function onSave() {
    if (props.extractedData.length > 0) {
      window.api
        .getOutputPath()
        .then((savePath) => {
          if (!savePath.canceled) {
            return savePath;
          }
          return null;
        })
        .then((savePath) => {
          if (savePath) {
            return window.api.saveOutput(savePath.filePaths[0], props.extractedData);
          }
          return null;
        })
        .then((result) => {
          if (result === true) {
            // if saveOutput() returns true, then the save process succeeded
            props.setShowSavedAlert(true);
          } else if (typeof result === 'string') {
            // if the result is a string, that means the save process returned an error message
            props.setErrorMessage(result);
            props.setShowErrorAlert(true);
          }
          // If result is null, the process was cancelled, and nothing should be done.
        })
        .catch((error) => {
          props.setShowErrorAlert(true);
          props.setErrorMessage(error.message);
          props.setShowSavedAlert(false);
          props.setShowNoFilesAlert(false);
        });
    } else {
      props.setShowNoFilesAlert(true);
    }
  }
  function onCancel() {
    props.setShowSaveForm(false);
  }
  return (
    <div>
      <p>This is the save form.</p>
      <div className="nav-button-container">
        <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="generic-button" siz="lg" variant="outline-secondary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default SaveOutputForm;
