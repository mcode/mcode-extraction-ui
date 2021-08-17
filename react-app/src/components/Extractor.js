import React, { useState } from 'react';
import { Accordion, Dropdown, Form } from 'react-bootstrap';
import FilePicker from './FilePicker';

function Extractor(props) {
  console.log(props);
  const [csvPath, setCsvPath] = useState(
    props.formData.constructorArgs.filePath ? props.formData.constructorArgs.filePath : 'No File Selected',
  );
  const [extractorLabel, setExtractorLabel] = useState(props.formData.label ? props.formData.label : '');

  // Variables for constructor arg management
  // defaultArgs must be declared in a non-state variable so that it can be used to set the values of both args and argsJSX
  const defaultArgs = [
    {
      filePath: props.formData.constructorArgs.filePath ? props.formData.constructorArgs.filePath : 'No File Selected',
      title: 'File Path',
      type: 'file',
      included: true,
      key: 'filePath',
      validExtractors: [
        'CSVAdverseEventExtractor',
        'CSVCancerDiseaseStatusExtractor',
        'CSVCancerRelatedMedicationExtractor',
        'CSVClinicalTrialInformationExtractor',
        'CSVConditionExtractor',
        'CSVObservationExtractor',
        'CSVPatientExtractor',
        'CSVProcedureExtractor',
        'CSVStagingExtractor',
        'CSVTreatmentPlanChangeExtractor',
      ],
    },
    {
      url: '',
      title: 'URL',
      type: 'string',
      format: 'url',
      included: false,
      key: 'url',
      validExtractors: [
        'CSVAdverseEventExtractor',
        'CSVCancerDiseaseStatusExtractor',
        'CSVCancerRelatedMedicationExtractor',
        'CSVClinicalTrialInformationExtractor',
        'CSVConditionExtractor',
        'CSVObservationExtractor',
        'CSVPatientExtractor',
        'CSVProcedureExtractor',
        'CSVStagingExtractor',
        'CSVTreatmentPlanChangeExtractor',
      ],
    },
    {
      clinicalSiteID: '',
      title: 'Clinical Site ID',
      type: 'string',
      included: false,
      key: 'clinicalSiteiD',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      clinicalSiteSystem: '',
      title: 'Clinical Site System',
      type: 'string',
      included: false,
      key: 'clinicalSiteSystem',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      cancerType: '',
      title: 'Type',
      type: 'string',
      included: false,
      key: 'cancerType',
      validExtractors: ['CSVCancerDiseaseStatusExtractor'],
    },
    {
      mask: '',
      title: 'Masked Fields',
      type: 'array',
      included: false,
      key: 'mask',
      items: {
        type: 'string',
      },
      validExtractors: ['CSVPatientExtractor'],
    },
  ];
  const [args, setArgs] = useState(defaultArgs);
  const [argsJSX, setArgsJSX] = useState(
    defaultArgs
      .filter((arg) => arg.included === true)
      .map((arg, i) => (
        <p key={arg.key}>
          This is a placeholder for arg {i}: {arg.title}
        </p>
      )),
  );

  function onExtractorLabelChange(e) {
    console.log(e);
    props.onExtractorLabelChange(e.target.value, props.eventKey);
    setExtractorLabel(e.target.value);
  }

  function onCsvPathChange(newPath) {
    setCsvPath(newPath);
    props.onCsvPathChange(newPath, props.eventKey);
  }

  function onClear() {
    setCsvPath('No File Selected');
    props.onCsvPathChange('No File Selected', props.eventKey);
  }
  function getFile() {
    window.api.getFile().then((promise) => {
      if (promise.filePaths[0] !== undefined) {
        setCsvPath(promise.filePaths[0]);
        props.onCsvPathChange(promise.filePaths[0], props.eventKey);
      }
    });
  }

  // FUNCTIONS FOR CONSTRUCTOR ARG MANAGEMENT
  function addArg(eventKey) {
    const tempArgs = [...args];
    tempArgs[eventKey].included = true;
    const tempArgsJSX = tempArgs.map((arg, i) => {
      if (arg.included === true) {
        return (
          <p key={arg.key}>
            This is a placeholder for argument {i}: {arg.key}
          </p>
        );
      }
    });
    const formData = {};
    // add all args and values to formData object used by react-jsonschema-form when form submits
    tempArgs.forEach((arg) => {
      formData[arg.key] = arg[arg.key];
    });
    setArgsJSX(tempArgsJSX);
    setArgs(tempArgs);
    props.onChange(formData);
  }

  function getArgOptions() {
    return args.map((arg, i) => (
      <Dropdown.Item value={arg.title} eventKey={i} key={arg.key}>
        {arg.title}
      </Dropdown.Item>
    ));
  }

  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header>{props.formData.type}</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Extractor Label</Form.Label>
          <Form.Control type="text" value={extractorLabel} onChange={onExtractorLabelChange} />
        </Form.Group>
        <p>Constructor Arguments</p>
        <FilePicker
          buttonText="Select File"
          controlId={props.label}
          onClick={getFile}
          setFilePath={onCsvPathChange}
          filePath={csvPath}
          label="CSV File Path"
          onClear={onClear}
          required={props.required}
        />
        <Dropdown onSelect={addArg}>
          <Dropdown.Toggle variant="outline-info" id="dropdown-basic" className="form-button">
            Add constructor argument
          </Dropdown.Toggle>
          <Dropdown.Menu>{getArgOptions()}</Dropdown.Menu>
        </Dropdown>
        {argsJSX}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Extractor;
