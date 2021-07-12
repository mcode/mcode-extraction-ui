import React, { useState } from 'react';
import { Alert, Button, Accordion } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ResultHeader from './ResultHeader';
import Result from './Result';

function ResultSidebar(props) {
  const history = useHistory();
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNoFilesAlert, setShowNoFilesAlert] = useState(false);

  function onExitResultPage() {
    // reset data values and return to home page
    history.push('/extract');
  }

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
            setShowSavedAlert(true);
          } else if (typeof result === 'string') {
            // if the result is a string, that means the save process returned an error message
            setErrorMessage(result);
            setShowErrorAlert(true);
          }
          // If result is null, the process was cancelled, and nothing should be done.
        })
        .catch((error) => {
          setShowErrorAlert(true);
          setErrorMessage(error.message);
          setShowSavedAlert(false);
          setShowNoFilesAlert(false);
        });
    } else {
      setShowNoFilesAlert(true);
    }
  }

  function getLoggerStats() {
    let errors = 0;
    let warnings = 0;

    props.loggedMessages.forEach((log) => {
      if (log.level === 'error') {
        errors += 1;
      }
      if (log.level === 'warn') {
        warnings += 1;
      }
    });

    return (
      <Accordion.Body>
        <p>Errors: {errors}</p>
        <p>Warnings: {warnings}</p>
      </Accordion.Body>
    );
  }

  const list = props.extractedData.map((bundle, i) => (
    <Result bundle={bundle} id={i} setPatientID={props.setPatientID} key={i} setShowLogs={props.setShowLogs} />
  ));

  return (
    <div className="sidebar d-flex flex-column">
      <ResultHeader />
      <div className="sidebar-interior">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey={-1}>
            <Accordion.Header
              onClick={() => {
                props.setPatientID(null);
                props.setShowLogs(true);
              }}
            >
              Log File
            </Accordion.Header>
            {getLoggerStats()}
          </Accordion.Item>
          {list}
        </Accordion>
      </div>
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
      {!showSavedAlert && !showErrorAlert && !showNoFilesAlert && (
        <div className="sidebar-button-container">
          <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onExitResultPage}>
            Exit
          </Button>
          <Button className="generic-button" siz="lg" variant="outline-secondary" onClick={onSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

export default ResultSidebar;
