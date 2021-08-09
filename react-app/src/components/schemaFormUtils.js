import React, { useState } from 'react';
import { Accordion, FloatingLabel, Form } from 'react-bootstrap';

function getConfigSchema() {
  return window.api.getConfigSchema();
}

const uiSchema = {
  patientIdCsvPath: {
    classNames: 'page-text',
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
  const [types, setTypes] = useState([
    'BaseFHIRExtractor',
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
    'Extractor',
    'FHIRAdverseEventExtractor',
    'FHIRAllergyIntoleranceExtractor',
    'FHIRConditionExtractor',
    'FHIRDocumentReferenceExtractor',
    'FHIREncounterExtractor',
    'FHIRMedicationOrderExtractor',
    'FHIRMedicationRequestExtractor',
    'FHIRMedicationStatementExtractor',
    'FHIRObservationExtractor',
    'FHIRPatientExtractor',
    'FHIRProcedureExtractor',
    'MCODERadiationProcedureExtractor',
    'MCODESurgicalProcedureExtractor',
  ]);

  const getFormattedTypes = () =>
    types.map((type) => (
      <option value={type} key={type}>
        {type}
      </option>
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

  function addExtractor(e) {
    // Remove selected type from dropdown
    const newTypes = types.filter((type) => type !== e.target.value);

    // update list of extractors, the JSX display, and the formData object
    const tempExtractors = [...extractors, getDefaultExtractorObj(e.target.value)];
    const tempExtractorsJSX = tempExtractors.map((extractor, i) => (
      <Extractor formData={extractor} eventKey={i} key={i} />
    ));
    setExtractorsJSX(tempExtractorsJSX);
    setExtractors(tempExtractors);
    props.onChange(tempExtractors);
    setTypes(newTypes);
    e.target.value = 'default';
  }

  return (
    <div>
      <h1 className="form-header-text">Extractors</h1>
      <Accordion defaultActiveKey="0">{extractorsJSX}</Accordion>
      <div className="form-button-container">
        <Form.Select onChange={addExtractor} className="form-select">
          <option value="default">Add new extractor</option>
          {getFormattedTypes()}
        </Form.Select>
      </div>
    </div>
  );
}

const widgets = {};

const fields = {
  ArrayField: ExtractorArray,
};

export { getConfigSchema, uiSchema, widgets, fields };
