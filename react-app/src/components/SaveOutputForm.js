import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import fhirpath from 'fhirpath';

function getLabel(bundle, id) {
  // attempt to get MRN and name with fhirpath
  const patient = fhirpath.evaluate(bundle, "Bundle.descendants().resource.where(resourceType='Patient')")[0];
  if (patient) {
    const mrn = patient.id;
    const name = patient.name[0].text;

    const isMasked = fhirpath.evaluate(patient, 'Patient.identifier.extension.valueCode')[0] === 'masked';

    // if both MRN and name -- return string w / both
    if (typeof mrn === 'string' && mrn.length > 0 && typeof name === 'string' && name.length > 0 && !isMasked) {
      const label = mrn.concat(': ').concat(name);
      return label;
    }
    // if either MRN or name -- return string / the available one
    if (typeof name === 'string' && name.length > 0) {
      return name;
    }
    // if neither MRN nor name -- "Patient " + patient_resource_id
    if (typeof mrn === 'string' && mrn.length > 0) {
      return mrn;
    }
  }

  // if no patient resource ID -- return "Patient " + props.id
  let label = 'Patient';
  label = label.concat(' ').concat(id.toString());
  return label;
}

function SaveOutputForm(props) {
  const [outputPath, setOutputPath] = useState('No Folder Selected');
  const [selectAll, setSelectAll] = useState(true);
  const [saveLogs, setSaveLogs] = useState(false);

  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNoFilesAlert, setShowNoFilesAlert] = useState(false);

  let defaultWhichFiles = {};
  props.extractedData.forEach((bundle, i) => {
    const label = getLabel(bundle, i);
    defaultWhichFiles = {
      ...defaultWhichFiles,
      [label]: true,
    };
  });
  const [whichFiles, setWhichFiles] = useState({ ...defaultWhichFiles });

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

  function toggleSaveLogs() {
    setSaveLogs(!saveLogs);
  }

  function togglePatientCheckbox(e) {
    setWhichFiles({ ...whichFiles, [e.target.id]: e.target.checked });
    if (e.target.checked) {
      let isAll = true;
      props.extractedData.forEach((bundle, i) => {
        const label = getLabel(bundle, i);
        // don't check current key, because state won't be updated yet
        if (label !== e.target.id && whichFiles[label] === false) {
          isAll = false;
        }
      });
      setSelectAll(isAll);
    }
    // if unchecking a checkbox, selectAll should be false
    if (!e.target.checked) {
      setSelectAll(false);
    }
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
    if (!selectAll) {
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
    // set select all
    setSelectAll(!selectAll);
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
        .saveOutput(outputPath, outputBundles, props.loggedMessages, saveLogs)
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
              <Form.Group controlId="outputFolder" className="mb-3">
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
              <Form.Group controlId="saveLogs" className="mb-3">
                <Form.Check type="checkbox" label="Save logger messages" checked={saveLogs} onChange={toggleSaveLogs} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="selectFiles" className="mb-3">
                <Form.Label className="form-label">Select Files to Save</Form.Label>
                <Form.Check type="checkbox" label="Select All" checked={selectAll} onChange={toggleSelectAll} />
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
              Save
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
