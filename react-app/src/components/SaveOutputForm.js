import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import getLabel from './patientUtils';

function SaveOutputForm(props) {
  const [saveLogs, setSaveLogs] = useState(false);

  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNoFilesAlert, setShowNoFilesAlert] = useState(false);

  let defaultWhichFiles = {};
  props.extractedData.forEach((bundle, i) => {
    const label = getLabel(bundle, i);
    defaultWhichFiles[label] = true;
  });
  const [whichFiles, setWhichFiles] = useState({ ...defaultWhichFiles });

  function toggleSaveLogs() {
    setSaveLogs(!saveLogs);
  }

  function isAllSelected() {
    let isAll = true;
    props.extractedData.forEach((bundle, i) => {
      const label = getLabel(bundle, i);
      if (whichFiles[label] === false) {
        isAll = false;
      }
    });
    return isAll;
  }

  function togglePatientCheckbox(e) {
    setWhichFiles({ ...whichFiles, [e.target.id]: e.target.checked });
  }

  function getPatientCheckboxes() {
    const list = props.extractedData.map((bundle, i) => {
      const label = getLabel(bundle, i);
      return (
        <Form.Check
          type="checkbox"
          label={label}
          key={label}
          id={label}
          checked={whichFiles[label]}
          onChange={togglePatientCheckbox}
        />
      );
    });
    return list;
  }

  function toggleSelectAll() {
    // modify which files will be saved first, so that there's no issues with state update delays
    if (!isAllSelected()) {
      props.extractedData.forEach((bundle, i) => {
        const label = getLabel(bundle, i);
        defaultWhichFiles = {
          ...defaultWhichFiles,
          [label]: true,
        };
      });
      setWhichFiles({ ...defaultWhichFiles });
    } else {
      props.extractedData.forEach((bundle, i) => {
        const label = getLabel(bundle, i);
        defaultWhichFiles = {
          ...defaultWhichFiles,
          [label]: false,
        };
      });
      setWhichFiles({ ...defaultWhichFiles });
    }
  }

  function onSave() {
    const outputBundles = [];
    props.extractedData.forEach((bundle, i) => {
      if (whichFiles[getLabel(bundle, i)] === true) {
        outputBundles.push({ bundle, index: i });
      }
    });
    if (outputBundles.length > 0) {
      window.api
        .getOutputPath()
        .then((savePath) => {
          if (!savePath.canceled) {
            return savePath.filePaths[0];
          }
          return null;
        })
        .then((outputPath) => {
          if (outputPath !== null) {
            return window.api.saveOutput(outputPath, outputBundles, props.loggedMessages, saveLogs);
          }
          return null;
        })
        .then((result) => {
          if (result === true) {
            // if saveOutput() returns true, then the save process succeeded
            setShowSavedAlert(true);
          }
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
  function onCancel() {
    props.setShowSaveForm(false);
  }
  return (
    <div className="page-container">
      <h3 className="page-subtitle">Save Output</h3>
      <div className="page-container">
        <Form className="form-container">
          <Row>
            <Col>
              <Form.Group controlId="saveLogs" className="mb-3">
                <Form.Check type="checkbox" label="Save logger messages" checked={saveLogs} onChange={toggleSaveLogs} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="selectFiles" className="mb-3">
                <Form.Label className="form-label">Select Files to Save</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Select All"
                  checked={isAllSelected()}
                  onChange={toggleSelectAll}
                  className="emphasized-list-text"
                />
                {getPatientCheckboxes()}
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {!showSavedAlert && !showErrorAlert && !showNoFilesAlert && (
          <div className="nav-button-container">
            <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="generic-button" siz="lg" variant="outline-secondary" onClick={onSave}>
              Save to Folder
            </Button>
          </div>
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
            <Alert.Heading>Warning: No patient data to save</Alert.Heading>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default SaveOutputForm;
