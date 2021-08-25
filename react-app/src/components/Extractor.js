import React, { useState } from 'react';
import { Accordion, Button, Dropdown, Form } from 'react-bootstrap';
import { Trash2 } from 'react-feather';
import FilePicker from './FilePicker';

function Extractor(props) {
  const [extractorLabel, setExtractorLabel] = useState(props.formData.label ? props.formData.label : '');

  // Variables for constructor arg management
  // key value must match up with the name of the field that stores the field's value
  const defaultArgValues = [
    {
      filePath: props.formData.constructorArgs.filePath ? props.formData.constructorArgs.filePath : 'No File Selected',
      label: 'CSV File Path',
      type: 'file',
      included: true,
      key: 'filePath',
      validExtractors: [],
    },
    {
      url: props.formData.constructorArgs.url ? props.formData.constructorArgs.url : '',
      label: 'CSV File URL',
      type: 'url',
      included: false,
      key: 'url',
      validExtractors: [],
    },
    {
      clinicalSiteID: props.formData.constructorArgs.clinicalSiteID
        ? props.formData.constructorArgs.clinicalSiteID
        : '',
      label: 'Clinical Site ID',
      type: 'string',
      included: false,
      key: 'clinicalSiteID',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      clinicalSiteSystem: props.formData.constructorArgs.clinicalSiteSystem
        ? props.formData.constructorArgs.clinicalSiteSystem
        : '',
      label: 'Clinical Site System',
      type: 'string',
      included: false,
      key: 'clinicalSiteSystem',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      cancerType: props.formData.constructorArgs.cancerType ? props.formData.constructorArgs.cancerType : '',
      label: 'Cancer Type',
      type: 'string',
      included: false,
      key: 'cancerType',
      validExtractors: ['CSVCancerDiseaseStatusExtractor'],
    },
    {
      mask: props.formData.constructorArgs.mask ? props.formData.constructorArgs.mask : '',
      label: 'Masked Fields',
      type: 'dropdown',
      included: false,
      key: 'mask',
      options: ['gender', 'mrn', 'name', 'address', 'birthDate', 'language', 'ethnicity', 'birthsex', 'race'],
      validExtractors: ['CSVPatientExtractor'],
    },
  ];

  const [args, setArgs] = useState(defaultArgValues);

  function onExtractorLabelChange(e) {
    props.onExtractorLabelChange(e.target.value, props.eventKey);
    setExtractorLabel(e.target.value);
  }

  // FUNCTIONS FOR CONSTRUCTOR ARG MANAGEMENT

  function updateArgs(inputArgs) {
    const constructorArgs = {};
    inputArgs
      .filter((arg) => arg.included === true)
      .forEach((arg) => {
        constructorArgs[arg.key] = arg[arg.key];
      });
    setArgs(inputArgs);
    props.onArgsChange(constructorArgs);
  }

  const getArg = (newArgs, key) => newArgs.find((temp) => key === temp.key);

  function getArgsJSX() {
    return args
      .filter((arg) => arg.included === true)
      .map((arg, i) => {
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
                      const newArgs = [...args];
                      const currentArg = getArg(newArgs, arg.key);
                      currentArg[arg.key] = e.target.value;
                      updateArgs(newArgs);
                    }}
                    className="arg-input-width-limit"
                  />
                  <Trash2
                    onClick={() => {
                      const newArgs = [...args];
                      const currentArg = getArg(newArgs, arg.key);
                      currentArg.included = false;
                      updateArgs(newArgs);
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
                    window.api.getFile().then((promise) => {
                      if (promise.filePaths[0] !== undefined) {
                        const newArgs = [...args];
                        [newArgs[i][arg.key]] = promise.filePaths;
                        updateArgs(newArgs);
                      }
                    });
                  }}
                  filePath={arg[arg.key]}
                  onClear={() => {
                    // do something to change value of file path and update state
                    const newArgs = [...args];
                    newArgs[i][arg.key] = 'No File Chosen';
                    updateArgs(newArgs);
                  }}
                  label={arg.label}
                  key={arg.key}
                  required={props.required}
                  extraButton={
                    <Button
                      onClick={() => {
                        const newArgs = [...args];
                        const fileArg = getArg(newArgs, 'filePath');
                        fileArg.included = false;
                        const urlArg = getArg(newArgs, 'url');
                        urlArg.included = true;
                        updateArgs(newArgs);
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
                      const newArgs = [...args];
                      const urlArg = getArg(newArgs, 'url');
                      urlArg.included = false;
                      const fileArg = getArg(newArgs, 'filePath');
                      fileArg.included = true;
                      updateArgs(newArgs);
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
                      const newArgs = [...args];
                      const currentArg = getArg(newArgs, arg.key);
                      currentArg[arg.key] = e.target.value;
                      updateArgs(newArgs);
                    }}
                    placeholder="Enter URL"
                  />
                </div>
              </Form.Group>
            );
          case 'dropdown':
            return (
              <Form.Group className="mb-3" controlId={arg.key} key={arg.key}>
                <div>
                  <Form.Label>{arg.label}</Form.Label>
                </div>
                <Form.Text>
                  Enter field(s) as a list separated by a commas. The options are gender, mrn, name, address, birthDate,
                  language, ethnicity, birthsex, and race.
                </Form.Text>
                <div className="label-and-icon-container">
                  <Form.Control
                    type="text"
                    value={arg[arg.key]}
                    onChange={(e) => {
                      const newArgs = [...args];
                      const currentArg = getArg(newArgs, arg.key);
                      currentArg[arg.key] = e.target.value;
                      updateArgs(newArgs);
                    }}
                    className="arg-input-width-limit"
                  />
                  <Trash2
                    onClick={() => {
                      const newArgs = [...args];
                      const currentArg = getArg(newArgs, arg.key);
                      currentArg.included = false;
                      updateArgs(newArgs);
                    }}
                    className="mouse-pointer"
                  />
                </div>
              </Form.Group>
            );
          default:
            return (
              <p key={arg.key}>
                This is a placeholder for unidentified argument {i}: {arg.key}
              </p>
            );
        }
      });
  }

  function addArg(eventKey) {
    const newArgs = [...args];
    const currentArg = getArg(newArgs, eventKey);
    currentArg.included = true;
    updateArgs(newArgs);
  }

  function hasArgs() {
    return args.filter((arg) => arg.validExtractors.includes(props.formData.type)).length > 0;
  }
  function getArgOptions() {
    return args
      .filter((arg) => arg.included === false && arg.validExtractors.includes(props.formData.type))
      .map((arg) => (
        <Dropdown.Item value={arg.label} eventKey={arg.key} key={arg.key}>
          {arg.label}
        </Dropdown.Item>
      ));
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
        {hasArgs() && getArgOptions().length < 1 && (
          <div className="form-button-container">
            <Button variant="outline-info" className="form-button" disabled={true}>
              All arguments added
            </Button>
          </div>
        )}
        {hasArgs() && getArgOptions().length >= 1 && (
          <Dropdown onSelect={addArg} className="form-button-container">
            <Dropdown.Toggle variant="outline-info" id="dropdown-basic" className="form-button">
              Add constructor argument
            </Dropdown.Toggle>
            <Dropdown.Menu>{getArgOptions()}</Dropdown.Menu>
          </Dropdown>
        )}
        {getArgsJSX()}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Extractor;
