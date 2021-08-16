import React, { useState } from 'react';
import { Accordion, Dropdown, Form } from 'react-bootstrap';
import FilePicker from './FilePicker';

function Extractor(props) {
  console.log(props);
  const [csvPath, setCsvPath] = useState(
    props.formData.constructorArgs.filePath ? props.formData.constructorArgs.filePath : 'No File Selected',
  );
  const [extractorLabel, setExtractorLabel] = useState(props.formData.label ? props.formData.label : '');
  const [args, setArgs] = useState({
    filePath: props.formData.constructorArgs.filePath ? props.formData.constructorArgs.filePath : 'No File Selected',
  });
  const [argOptions, setArgOptions] = useState([
    {
      defaultObj: {
        filePath: '',
      },
      title: 'File Path',
      type: 'string',
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
      defaultObj: {
        url: '',
      },
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
      defaultObj: {
        clinicalSiteID: '',
      },
      title: 'Clinical Site ID',
      type: 'string',
      included: false,
      key: 'clinicalSiteiD',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      defaultObj: {
        value: '',
      },
      title: 'Clinical Site System',
      type: 'string',
      included: false,
      key: 'clinicalSiteSystem',
      validExtractors: ['CSVClinicalTrialInformationExtractor'],
    },
    {
      defaultObj: {
        type: '',
      },
      title: 'Type',
      type: 'string',
      included: false,
      key: 'type',
      validExtractors: ['CSVCancerDiseaseStatusExtractor'],
    },
    {
      defaultObj: {
        mask: '',
      },
      title: 'Masked Fields',
      type: 'array',
      included: false,
      key: 'mask',
      items: {
        type: 'string',
      },
      validExtractors: ['CSVPatientExtractor'],
    },
  ]);

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

  function updateArgs(tempExtractors) {
    const tempExtractorsJSX = tempExtractors.map((extractor, i) => (
      <Extractor
        formData={extractor}
        eventKey={i}
        key={i}
        onCsvPathChange={(newPath, index) => {
          const tempArray = [...tempExtractors];
          tempArray[index].constructorArgs.filePath = newPath;
          updateExtractors(tempArray);
        }}
        onExtractorLabelChange={(label, index) => {
          const tempArray = [...tempExtractors];
          tempArray[index].label = label;
          updateExtractors(tempArray);
        }}
      />
    ));
    setExtractorsJSX(tempExtractorsJSX);
    setExtractors(tempExtractors);
    props.onChange(tempExtractors);
  }

  function addArg(eventKey) {
    const tempArgs = { ...args, [argOptions[eventKey].key]: argOptions[eventKey].defaultObj };
    const tempArgOptions = argOptions;
    tempArgOptions[eventKey].included = true;
    setArgOptions(tempArgOptions);
    updateArgs(tempArgs);
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
          <Dropdown.Menu>{getFormattedArgs()}</Dropdown.Menu>
        </Dropdown>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Extractor;
