import React, { useState } from 'react';
import { Accordion, Button, Dropdown, Form } from 'react-bootstrap';
import FilePicker from './FilePicker';

function getConfigSchema() {
  return window.api.getConfigSchema();
}

const uiSchema = {
  patientIdCsvPath: {
    'ui:label': false,
    'ui:widget': 'file',
  },
  commonExtractorArgs: {
    classNames: 'page-text',
    baseFhirUrl: {
      classNames: 'page-text',
    },
    requestHeaders: {
      classNames: 'page-text',
    },
  },
  notificationInfo: {
    classNames: 'page-text',
    host: {
      classNames: 'page-text',
    },
    port: {
      classNames: 'page-text',
    },
    from: {
      classNames: 'page-text',
    },
    to: {
      classNames: 'page-text',
    },
    tlsRejectUnauthorized: {
      classNames: 'page-text',
    },
  },
  extractors: {
    extractor: {
      classNames: 'page-text',
      label: {
        classNames: 'page-text',
      },
      type: {
        classNames: 'page-text',
      },
      constructorArgs: {
        classNames: 'page-text',
        filePath: {
          classNames: 'page-text',
        },
        url: {
          classNames: 'page-text',
        },
        clinicalSiteID: {
          classNames: 'page-text',
        },
        clinicalSiteSystem: {
          classNames: 'page-text',
        },
        type: {
          classNames: 'page-text',
        },
        mask: {
          classNames: 'page-text',
        },
      },
    },
  },
};

function Extractor(props) {
  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header>{props.formData.type}</Accordion.Header>
      <Accordion.Body>
        <p>This is a placeholder for an extractor. An input form will be added here.</p>
      </Accordion.Body>
    </Accordion.Item>
  );
}

function ExtractorArray(props) {
  const [extractors, setExtractors] = useState([]);
  const [extractorsJSX, setExtractorsJSX] = useState([]);
  const types = [
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
  ];

  const getFormattedTypes = () =>
    types.map((type) => (
      <Dropdown.Item value={type} eventKey={type} key={type}>
        {type}
      </Dropdown.Item>
    ));

  function getDefaultExtractorObj(type = '') {
    return {
      label: '',
      type,
      constructorArgs: {
        filePath: 'No File Chosen',
      },
    };
  }

  function addExtractor(eventKey) {
    // update list of extractors, the JSX display, and the formData object
    const tempExtractors = [...extractors, getDefaultExtractorObj(eventKey)];
    const tempExtractorsJSX = tempExtractors.map((extractor, i) => (
      <Extractor formData={extractor} eventKey={i} key={i} />
    ));
    setExtractorsJSX(tempExtractorsJSX);
    setExtractors(tempExtractors);
    props.onChange(tempExtractors);
  }

  function sortExtractorsByType() {
    // alphabetize
    const tempExtractors = extractors;
    tempExtractors.sort((a, b) => {
      if (a.type > b.type) {
        return 1;
      }
      if (a.type < b.type) {
        return -1;
      }
      return 0;
    });
    // update list of extractors, the JSX display, and the formData object
    const tempExtractorsJSX = tempExtractors.map((extractor, i) => (
      <Extractor formData={extractor} eventKey={i} key={i} />
    ));
    setExtractorsJSX(tempExtractorsJSX);
    setExtractors(tempExtractors);
    props.onChange(tempExtractors);
  }

  return (
    <div>
      <h1 className="form-header-text">Extractors</h1>
      <div className="form-button-container">
        <Button
          variant="outline-info"
          className="narrow-button form-button"
          onClick={sortExtractorsByType}
          disabled={extractors.length < 1}
        >
          Sort by Type
        </Button>
        <Dropdown onSelect={addExtractor}>
          <Dropdown.Toggle variant="outline-info" id="dropdown-basic" className="form-button">
            Add new extractor
          </Dropdown.Toggle>
          <Dropdown.Menu>{getFormattedTypes()}</Dropdown.Menu>
        </Dropdown>
      </div>
      <Accordion defaultActiveKey="0">{extractorsJSX}</Accordion>
      <div className="form-button-container"></div>
    </div>
  );
}

function FileWidget(props) {
  let startingPath = 'No File Selected';
  if (props.value) {
    startingPath = props.value;
  }
  const [path, setPath] = useState(startingPath);

  function setFilePath(newPath) {
    setPath(newPath);
    props.onChange(newPath);
  }

  function onClear() {
    setPath('No File Selected');
  }
  function getFile() {
    window.api.getFile().then((promise) => {
      if (promise.filePaths[0] !== undefined) {
        setPath(promise.filePaths[0]);
        props.onChange(promise.filePaths[0]);
      }
    });
  }
  return (
    <FilePicker
      buttonText="Select File"
      controlId={props.label}
      onClick={getFile}
      setFilePath={setFilePath}
      filePath={path}
      label={props.label}
      onClear={onClear}
      required={props.required}
    />
  );
}

function StringInput(props) {
  console.log(props);
  return (
    <Form.Group className="mb-3" controlId="props.name">
      <Form.Label>
        {props.schema.title}
        {props.required && '*'}
      </Form.Label>
      <Form.Control type="text" />
    </Form.Group>
  );
}

const widgets = {
  FileWidget,
};

const fields = {
  ArrayField: ExtractorArray,
  StringField: StringInput,
};

export { getConfigSchema, uiSchema, widgets, fields };
