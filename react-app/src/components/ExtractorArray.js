import React, { useEffect, useState } from 'react';
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

  // DELETE ME
  //   function updateExtractors(tempExtractors) {

  //     const tempExtractorsJSX = tempExtractors.map((extractor, i) => (
  //       <Extractor
  //         formData={extractor}
  //         eventKey={i}
  //         key={i}
  //         onCsvPathChange={(newPath, index) => {
  //           const tempArray = [...tempExtractors];
  //           tempArray[index].constructorArgs.filePath = newPath;
  //           updateExtractors(tempArray);
  //         }}
  //         onExtractorLabelChange={(label, index) => {
  //           const tempArray = [...tempExtractors];
  //           tempArray[index].label = label;
  //           updateExtractors(tempArray);
  //         }}
  //         onChange={(extractorObj) => {
  //           console.log('Extractor attempted to update value stored in formData with this data: ');
  //           console.log(extractorObj);
  //         }}
  //       />
  //     ));
  //     setExtractorsJSX(tempExtractorsJSX);

  //     props.onChange(tempExtractors);
  //   }

  function addExtractor(eventKey) {
    // update list of extractors, the JSX display, and the formData object
    const tempExtractors = [...extractors, getDefaultExtractorObj(eventKey)];
    setExtractors(tempExtractors);
  }

  function sortExtractorsByType() {
    // alphabetize
    const tempExtractors = [...extractors];
    console.log('tempExtracts before sorting: ');
    console.log(tempExtractors[2]);
    console.log(tempExtractors);
    tempExtractors.sort((a, b) => {
      if (a.type > b.type) {
        return 1;
      }
      if (a.type < b.type) {
        return -1;
      }
      return 0;
    });
    console.log('sorted tempExtractors. New array: ');
    console.log(tempExtractors[2]);
    console.log(tempExtractors);

    // trigger update of list of extractors, the JSX display, and the formData object
    setExtractors(tempExtractors);
  }

  const updateFormData = props.onChange;
  useEffect(() => {
    const tempExtractorsJSX = extractors.map((extractor, i) => (
      <Extractor
        formData={extractor}
        eventKey={i}
        key={i}
        onCsvPathChange={(newPath, index) => {
          const tempArray = [...extractors];
          tempArray[index].constructorArgs.filePath = newPath;
          setExtractors(tempArray);
        }}
        onExtractorLabelChange={(label, index) => {
          const tempArray = [...extractors];
          tempArray[index].label = label;
          setExtractors(tempArray);
        }}
        onChange={(extractorObj) => {
          console.log('Extractor attempted to update value stored in formData with this data: ');
          console.log(extractorObj);
        }}
      />
    ));
    setExtractorsJSX(tempExtractorsJSX);

    updateFormData(extractors);
  }, [extractors, updateFormData]);

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
