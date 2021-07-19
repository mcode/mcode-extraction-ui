import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

function SaveOutputForm(props) {
  const [outputPath, setOutputPath] = useState('No Folder Selected');
  const [selectAll, setSelectAll] = useState(true);
  const [saveLogs, setSaveLogs] = useState(false);
  function onSetOutputPath() {
    window.api.getOutputPath().then((savePath) => {
      if (!savePath.canceled) {
        setOutputPath(savePath.filePaths[0]);
      }
    });
  }

  function clearOutputPath() {
    setOutputPath('No Folder Selected');
  }

  function toggleSelectAll() {
    // modify which files will be saved first, so that there's no issues with state update delays
    if (!selectAll) {
      // make all the other files to save true
    }
    // set select all
    setSelectAll(!selectAll);
  }

  function toggleSaveLogs() {
    setSaveLogs(!saveLogs);
  }

  function onSave() {
    if (props.extractedData.length > 0) {
      window.api
        .saveOutput(outputPath, props.extractedData)
        .then((result) => {
          if (result === true) {
            // if saveOutput() returns true, then the save process succeeded
            props.setShowSavedAlert(true);
          } else if (typeof result === 'string') {
            // if the result is a string, that means the save process returned an error message
            props.setErrorMessage(result);
            props.setShowErrorAlert(true);
          }
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
    <div className="page-container">
      <h3 className="page-subtitle">Save Output</h3>
      <div className="page-container">
        <Form className="form-container">
          <Row>
            <Col>
              <Form.Group controlId="formConfigPath" className="mb-3">
                <Form.Label className="form-label">Select Output Folder</Form.Label>
                <div className="file-picker-box">
                  <div className="file-button-container">
                    <Button className="generic-button narrow-button" variant="outline-info" onClick={onSetOutputPath}>
                      Select Folder
                    </Button>
                    <Button className="generic-button narrow-button" variant="outline-info" onClick={clearOutputPath}>
                      Clear
                    </Button>
                  </div>
                  <Form.Label className="form-label file-name">{outputPath}</Form.Label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formConfigPath" className="mb-3">
                <Form.Check type="checkbox" label="Save Log File" checked={saveLogs} onChange={toggleSaveLogs} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formConfigPath" className="mb-3">
                <Form.Label className="form-label">Select Files to Save</Form.Label>
                <Form.Check type="checkbox" label="Select All" checked={selectAll} onChange={toggleSelectAll} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <div className="nav-button-container">
          <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="generic-button" siz="lg" variant="outline-secondary" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SaveOutputForm;
