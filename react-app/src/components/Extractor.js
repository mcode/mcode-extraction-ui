import React, { useEffect, useState } from 'react';
import { Accordion, Dropdown, Form } from 'react-bootstrap';
import FilePicker from './FilePicker';

function Extractor(props) {
  console.log(props);
  const [extractorLabel, setExtractorLabel] = useState(props.formData.label ? props.formData.label : '');

  // Variables for constructor arg management
  // defaultArgs must be declared in a non-state variable so that it can be used to set the values of both args and argsJSX
  function getArgValues() {
    return [
      {
        filePath: props.formData.constructorArgs.filePath
          ? props.formData.constructorArgs.filePath
          : 'No File Selected',
        label: 'CSV File Path',
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
        url: props.formData.constructorArgs.url ? props.formData.constructorArgs.url : '',
        label: 'URL',
        type: 'url',
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
        label: 'Type',
        type: 'string',
        included: false,
        key: 'cancerType',
        validExtractors: ['CSVCancerDiseaseStatusExtractor'],
      },
      {
        mask: props.formData.constructorArgs.mask ? props.formData.constructorArgs.mask : '',
        label: 'Masked Fields',
        type: 'array',
        included: false,
        key: 'mask',
        items: {
          type: 'string',
        },
        validExtractors: ['CSVPatientExtractor'],
      },
    ];
  }
  const [args, setArgs] = useState(getArgValues());
  // this function has to be declared here so that it can be used to set the value of argsJSX
  const [argsJSX, setArgsJSX] = useState(
    getArgValues()
      .filter((arg) => arg.included === true)
      .map((arg, i) => (
        <p key={arg.key}>
          This is a placeholder for arg {i}: {arg.label}
        </p>
      )),
  );

  function onExtractorLabelChange(e) {
    props.onExtractorLabelChange(e.target.value, props.eventKey);
    setExtractorLabel(e.target.value);
  }

  // FUNCTIONS FOR CONSTRUCTOR ARG MANAGEMENT

  function getArgsJSX(tempArgs, updateArgData) {
    return tempArgs
      .filter((arg) => arg.included === true)
      .map((arg, i) => {
        switch (arg.type) {
          case 'string':
            return (
              <Form.Group className="mb-3" controlId="formBasicEmail" key={arg.key}>
                <Form.Label>{arg.label}</Form.Label>
                <Form.Control
                  type="text"
                  value={arg[arg.key]}
                  onChange={(e) => {
                    const newArgs = [...tempArgs];
                    newArgs.find((temp) => arg.key === temp.key)[arg.key] = e.target.value;
                    updateArgData(newArgs, false);
                  }}
                />
              </Form.Group>
            );
          case 'file':
            return (
              <FilePicker
                buttonText="Select File"
                controlId={arg.label}
                onClick={() => {
                  window.api.getFile().then((promise) => {
                    if (promise.filePaths[0] !== undefined) {
                      const newArgs = [...args];
                      [newArgs[i][arg.key]] = promise.filePaths;
                      updateArgData(newArgs, false);
                    }
                  });
                }}
                filePath={arg[arg.key]}
                label={arg.label}
                onClear={() => {
                  // do something to change value of file path and update state
                  const newArgs = [...args];
                  newArgs[i][arg.key] = 'No File Chosen';
                  updateArgData(newArgs, false);
                }}
                key={arg.key}
                required={props.required}
              />
            );
          case 'url':
            return (
              <p key={arg.key}>
                This is a placeholder for url argument {i}: {arg.key}
              </p>
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

  function updateArgs(inputArgs, isAccordion = true) {
    let tempArgs;
    if (isAccordion === true) {
      tempArgs = [...args];
    } else {
      tempArgs = [...inputArgs];
    }

    const formData = {
      type: props.formData.type,
      label: extractorLabel,
      constructorArgs: {},
    };
    // add all args and values to formData object used by react-jsonschema-form when form submits
    tempArgs.forEach((arg) => {
      formData.constructorArgs[arg.key] = arg[arg.key];
    });
    setArgsJSX(getArgsJSX(tempArgs, updateArgs));
    setArgs(tempArgs);
    props.onChange(formData);
  }

  function addArg(eventKey) {
    const tempArgs = [...args];
    tempArgs.find((arg) => arg.key === eventKey).included = true;
    updateArgs(tempArgs, false);
  }

  function getArgOptions() {
    return args
      .filter((arg) => arg.included === false)
      .map((arg) => (
        <Dropdown.Item value={arg.label} eventKey={arg.key} key={arg.key}>
          {arg.label}
        </Dropdown.Item>
      ));
  }
  // useEffect(() => {
  //   setArgsJSX([...args]);
  // }, [args, getArgValues]);
  // useEffect(() => {
  //   setArgs(getArgValues());
  // }, [props.formData]);

  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header onClick={updateArgs}>{props.formData.type}</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Extractor Label</Form.Label>
          <Form.Control type="text" value={extractorLabel} onChange={onExtractorLabelChange} />
        </Form.Group>
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
