import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import fhirpath from 'fhirpath';

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

  function toggleSaveLogs() {
    setSaveLogs(!saveLogs);
  }

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

  let defaultWhichFiles = {};
  props.extractedData.forEach((bundle, i) => {
    const label = getLabel(bundle, i);
    defaultWhichFiles = {
      ...defaultWhichFiles,
      [label]: true,
    };
  });
  const [whichFiles, setWhichFiles] = useState({ ...defaultWhichFiles });

  // let whichFiles = {};

  function togglePatientCheckbox(e) {
    console.log(e);
    console.log('e.target.id: ', e.target.id);
    console.log('e.target.checked: ', e.target.checked);
    setWhichFiles({ ...whichFiles, [e.target.id]: e.target.checked });
    if (!e.target.checked && selectAll) {
      setSelectAll(false);
    }
  }

  function getPatientCheckboxes() {
    console.log(whichFiles);
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
    }
    // set select all
    setSelectAll(!selectAll);
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
                {getPatientCheckboxes()}
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
