import React, { useState } from 'react';
import { Accordion, Button, Dropdown } from 'react-bootstrap';
import Extractor from './Extractor';

function ExtractorArray(props) {
  console.log(props);

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

  function updateExtractors(tempExtractors) {
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

  function addExtractor(eventKey) {
    // update list of extractors, the JSX display, and the formData object
    const tempExtractors = [...extractors, getDefaultExtractorObj(eventKey)];
    updateExtractors(tempExtractors);
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

export default ExtractorArray;
