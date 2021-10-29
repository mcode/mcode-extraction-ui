import React, { useState } from 'react';
import { Accordion, Button, Dropdown, Form } from 'react-bootstrap';
import { Trash2 } from 'react-feather';
import FilePicker from '../CommonComponents/FilePicker';

// Variables for constructor arg management
// key value must match up with the name of the field that stores the field's value
// File inputs must have an array of strings called fileTypes. This array lists the file extensions that the user will be allowed to select.
// Dropdown inputs must have an options array. This array lists the values that will appear in the dropdown.
function defaultConstructorArgsMetadata(constructorArgs) {
  return [
    {
      filePath: constructorArgs.filePath || 'No File Selected',
      label: 'CSV File Path',
      type: 'file',
      hidden: false,
      key: 'filePath',
      fileTypes: ['csv'],
      validExtractors: [],
    },
    {
      url: constructorArgs.url || '',
      label: 'CSV File URL',
      type: 'url',
      hidden: true,
      key: 'url',
      validExtractors: [],
    },
    {
      clinicalSiteID: constructorArgs.clinicalSiteID || '',
      label: 'Clinical Site ID',
      type: 'string',
      hidden: true,
      key: 'clinicalSiteID',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      clinicalSiteSystem: constructorArgs.clinicalSiteSystem || '',
      label: 'Clinical Site System',
      type: 'string',
      hidden: true,
      key: 'clinicalSiteSystem',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      cancerType: constructorArgs.cancerType || '',
      label: 'Cancer Type',
      type: 'dropdown',
      hidden: true,
      key: 'cancerType',
      options: ['primary', 'secondary', 'all'],
      text: "Select cancer types to include (if this argument is not included, 'all' is chosen by default)",
      validExtractors: ['CSVCancerDiseaseStatusExtractor'],
    },
    {
      mask: constructorArgs.mask || [],
      label: 'Masked Fields',
      type: 'checkbox',
      hidden: true,
      key: 'mask',
      options: [
        'genderAndSex',
        'mrn',
        'name',
        'address',
        'birthDate',
        'language',
        'ethnicity',
        'birthsex',
        'race',
        'telecom',
        'multipleBirth',
        'photo',
        'contact',
        'generalPractitioner',
        'managingOrganization',
        'link',
      ],
      text: 'Select fields to be masked in the extracted Patient resource',
      validExtractors: ['CSVPatientExtractor'],
    },
  ];
}

function ExtractorObject(props) {
  // Get a label for the extractor
  const [extractorLabel, setExtractorLabel] = useState(props.formData.label || '');

  // Update the extractorLabel as needed
  function onExtractorLabelChange(e) {
    props.onExtractorLabelChange(e.target.value);
    setExtractorLabel(e.target.value);
  }

  // Derive and maintain some metadata about which constructorArgs can/should be rendered
  const [constructorArgsMetadata, setConstructorArgsMetadata] = useState(
    defaultConstructorArgsMetadata(props.formData.constructorArgs),
  );

  // For this extractorType, determines if there are any valid constructor args that could be hidden
  const hasConstructorArgs =
    constructorArgsMetadata.filter((arg) => arg.validExtractors.includes(props.formData.type)).length > 0;

  // For this extractorType, build a list of all possible constructorArgs
  const constructorArgOptions = constructorArgsMetadata
    .filter((arg) => arg.hidden && arg.validExtractors.includes(props.formData.type))
    .map((arg) => (
      <Dropdown.Item value={arg.label} eventKey={arg.key} key={arg.key}>
        {arg.label}
      </Dropdown.Item>
    ));

  // Updates local constructorArgs metadata as well as extractor's props-level formData
  function updateConstructorArgsMetadata(inputArgs) {
    const tempConstructorArgsMetadata = {};
    inputArgs
      .filter((arg) => !arg.hidden)
      .forEach((arg) => {
        tempConstructorArgsMetadata[arg.key] = arg[arg.key];
      });
    setConstructorArgsMetadata(inputArgs);
    props.onArgsChange(tempConstructorArgsMetadata);
  }

  // Handles updates to multi-select Options fields such as "mask"
  function updateOptions(argObj, changedValue, propertyName) {
    const currentOptions = argObj[propertyName];
    const changedIndex = currentOptions.indexOf(changedValue);
    if (changedIndex > -1) {
      currentOptions.splice(changedIndex, 1);
    } else {
      currentOptions.push(changedValue);
    }
  }

  // Helper to find a constructorArg in a list with a key
  const getConstructorArg = (newArgs, key) => newArgs.find((temp) => key === temp.key);

  // Given a particular constructorArg's key, turn off the hidden flag
  function showConstructorArg(eventKey) {
    const newArgs = [...constructorArgsMetadata];
    const currentArg = getConstructorArg(newArgs, eventKey);
    currentArg.hidden = false;
    updateConstructorArgsMetadata(newArgs);
  }

  // Function for all the rendering logic of constructorArgs
  function renderConstructorArg(arg, i) {
    switch (arg.type) {
      case 'string':
        return (
          <Form.Group className="mb-3" controlId={arg.key} key={arg.key}>
            <Form.Label>{arg.label}</Form.Label>
            <div className="label-and-icon-container">
              <Form.Control
                type="text"
                value={arg[arg.key]}
                onChange={(e) => {
                  const newArgs = [...constructorArgsMetadata];
                  const currentArg = getConstructorArg(newArgs, arg.key);
                  currentArg[arg.key] = e.target.value;
                  updateConstructorArgsMetadata(newArgs);
                }}
                className="arg-input-width-limit"
              />
              <Trash2
                onClick={() => {
                  const newArgs = [...constructorArgsMetadata];
                  const currentArg = getConstructorArg(newArgs, arg.key);
                  currentArg.hidden = true;
                  updateConstructorArgsMetadata(newArgs);
                }}
                className="mouse-pointer"
              />
            </div>
          </Form.Group>
        );
      case 'file':
        return (
          <div key={arg.key}>
            <FilePicker
              buttonText="Select File"
              controlId={arg.label}
              onClick={() => {
                window.api.getFile(arg.fileTypes).then((promise) => {
                  if (promise.filePaths[0] !== undefined) {
                    const newArgs = [...constructorArgsMetadata];
                    [newArgs[i][arg.key]] = promise.filePaths;
                    updateConstructorArgsMetadata(newArgs);
                  }
                });
              }}
              filePath={arg[arg.key]}
              onClear={() => {
                // do something to change value of file path and update state
                const newArgs = [...constructorArgsMetadata];
                newArgs[i][arg.key] = 'No File Chosen';
                updateConstructorArgsMetadata(newArgs);
              }}
              label={arg.label}
              key={arg.key}
              required={props.required}
              extraButton={
                <Button
                  onClick={() => {
                    const newArgs = [...constructorArgsMetadata];
                    const fileArg = getConstructorArg(newArgs, 'filePath');
                    fileArg.hidden = true;
                    const urlArg = getConstructorArg(newArgs, 'url');
                    urlArg.hidden = false;
                    updateConstructorArgsMetadata(newArgs);
                  }}
                  className="generic-button narrow-button"
                  variant="outline-info"
                >
                  Switch to URL
                </Button>
              }
            />
          </div>
        );
      case 'url':
        return (
          <Form.Group className="mb-3" controlId={arg.key} key={arg.key}>
            <Form.Label>{arg.label}</Form.Label>
            <div className="file-button-container">
              <Button
                onClick={() => {
                  const newArgs = [...constructorArgsMetadata];
                  const urlArg = getConstructorArg(newArgs, 'url');
                  urlArg.hidden = true;
                  const fileArg = getConstructorArg(newArgs, 'filePath');
                  fileArg.hidden = false;
                  updateConstructorArgsMetadata(newArgs);
                }}
                className="generic-button narrow-button"
                variant="outline-info"
              >
                Switch to CSV File
              </Button>
              <Form.Control
                type="text"
                value={arg[arg.key]}
                onChange={(e) => {
                  const newArgs = [...constructorArgsMetadata];
                  const currentArg = getConstructorArg(newArgs, arg.key);
                  currentArg[arg.key] = e.target.value;
                  updateConstructorArgsMetadata(newArgs);
                }}
                placeholder="Enter URL"
              />
            </div>
          </Form.Group>
        );
      case 'checkbox':
        return (
          <Form.Group className="mb-3" controlId={arg.key} key={arg.key}>
            <div className="label-and-icon-container">
              <Form.Label>{arg.label}</Form.Label>
              <Form.Text>{arg.text}</Form.Text>
              <Trash2
                onClick={() => {
                  const newArgs = [...constructorArgsMetadata];
                  const currentArg = getConstructorArg(newArgs, arg.key);
                  currentArg.hidden = true;
                  updateConstructorArgsMetadata(newArgs);
                }}
                className="mouse-pointer"
              />
            </div>
            {arg.options.map((option) => (
              <Form.Check
                label={option}
                name={option}
                type="checkbox"
                value={option}
                key={`mask-${option}`}
                id={`mask-${option}`}
                className="arg-input-width-limit"
                onChange={(e) => {
                  const newArgs = [...constructorArgsMetadata];
                  const currentArg = getConstructorArg(newArgs, arg.key);
                  updateOptions(currentArg, e.target.value, arg.key);
                  updateConstructorArgsMetadata(newArgs);
                }}
              />
            ))}
          </Form.Group>
        );
      case 'dropdown':
        return (
          <Form.Group className="mb-3" controlId={arg.key} key={arg.key}>
            <Form.Label>{arg.label}</Form.Label>
            <Form.Text className="ps-1">{arg.text}</Form.Text>
            <div className="label-and-icon-container">
              <Form.Select
                onChange={(e) => {
                  const newArgs = [...constructorArgsMetadata];
                  const currentArg = getConstructorArg(newArgs, arg.key);
                  currentArg[arg.key] = e.target.value;
                  updateConstructorArgsMetadata(newArgs);
                }}
                className="arg-input-width-limit"
              >
                {arg.options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
              <Trash2
                onClick={() => {
                  const newArgs = [...constructorArgsMetadata];
                  const currentArg = getConstructorArg(newArgs, arg.key);
                  currentArg.hidden = true;
                  updateConstructorArgsMetadata(newArgs);
                }}
                className="mouse-pointer"
              />
            </div>
          </Form.Group>
        );
      default:
        console.error('Unexpected ConstructorArg type: ', arg.type);
        return (
          <p key={arg.key}>
            This is a placeholder for unidentified argument {i}: {arg.key}
          </p>
        );
    }
  }

  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header onClick={props.onOpenAccordion}>
        <div className="label-and-icon-container">
          {props.formData.type}
          <Trash2 onClick={props.deleteExtractor} className="mouse-pointer" />
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Extractor Label</Form.Label>
          <Form.Control type="text" value={extractorLabel} onChange={onExtractorLabelChange} />
        </Form.Group>
        <p className="form-subheader-text">Constructor Arguments</p>
        {hasConstructorArgs && constructorArgOptions.length < 1 && (
          <div className="form-button-container">
            <Button variant="outline-info" className="form-button" disabled={true}>
              All arguments added
            </Button>
          </div>
        )}
        {hasConstructorArgs && constructorArgOptions.length >= 1 && (
          <Dropdown onSelect={showConstructorArg} className="form-button-container">
            <Dropdown.Toggle variant="outline-info" id="dropdown-basic" className="form-button">
              Add constructor argument
            </Dropdown.Toggle>
            <Dropdown.Menu>{constructorArgOptions}</Dropdown.Menu>
          </Dropdown>
        )}
        {constructorArgsMetadata.filter((arg) => !arg.hidden).map(renderConstructorArg)}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default ExtractorObject;
