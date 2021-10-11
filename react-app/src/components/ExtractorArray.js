import _ from 'lodash';
import React, { useState } from 'react';
import { Accordion, Button, Dropdown } from 'react-bootstrap';
import Extractor from './Extractor';

function ExtractorArray(props) {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const extractors = props.formData || [];
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
      constructorArgs: {},
      id: _.uniqueId(),
    };
  }

  function updateExtractors(tempExtractors) {
    props.onChange(tempExtractors);
  }

  function addExtractor(eventKey) {
    // update list of extractors and the formData object
    const tempExtractors = [...extractors, getDefaultExtractorObj(eventKey)];
    setActiveAccordion(tempExtractors[tempExtractors.length - 1].id);
    updateExtractors(tempExtractors);
  }

  function sortExtractorsByType() {
    // alphabetize
    const tempExtractors = [...extractors];
    tempExtractors.sort((a, b) => {
      if (a.type > b.type) {
        return 1;
      }
      if (a.type < b.type) {
        return -1;
      }
      return 0;
    });

    // update list of extractors and the formData object
    updateExtractors(tempExtractors);
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
      <Accordion activeKey={activeAccordion}>
        {extractors.map((extractor, i) => (
          <Extractor
            formData={extractor}
            eventKey={extractor.id}
            key={extractor.id}
            deleteExtractor={() => {
              const tempArray = [...extractors];
              tempArray.splice(i, 1);
              updateExtractors(tempArray);
            }}
            onExtractorLabelChange={(label) => {
              const tempArray = [...extractors];
              tempArray[i].label = label;
              updateExtractors(tempArray);
            }}
            onArgsChange={(extractorObj) => {
              const newExtractors = [...extractors];
              newExtractors[i].constructorArgs = extractorObj;
              updateExtractors(newExtractors);
            }}
            onOpenAccordion={() => {
              setActiveAccordion(extractor.id);
            }}
          />
        ))}
      </Accordion>
    </div>
  );
}

export default ExtractorArray;
