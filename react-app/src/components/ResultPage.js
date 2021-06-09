import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PatientData from './PatientData';
import Result from './Result';

import '../stylesheets/Home.css';

function ResultPage(props) {
  const [patientID, setPatientID] = useState(-1);
  const history = useHistory();

  function onExitResultPage() {
    // reset data values and return to home page
    history.push('/extract');
  }

  function onExitPatientData() {
    setPatientID(-1);
  }

  function onSave() {
    // Save the results permanently somehow
  }

  return (
    <div>
      {patientID < 0 && (
        <div>
          <h1 className="page-title">Results</h1>
          <div className="result-table">
            {props.extractedData.forEach((bundle, i) => (
              <Result bundle={bundle} id={i} />
            ))}
          </div>
          <div className="nav-button-container">
            <Button className="nav-button" variant="nav" id="nav-button" onClick={onExitResultPage}>
              Exit
            </Button>
            <Button className="nav-button" type="submit" variant="nav" id="nav-button" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      )}
      {patientID >= 0 && (
        <div>
          <h1 className="page-title">Patient {this.state.patientID}</h1>
          <PatientData bundle={props.extractedData[patientID]} id={patientID} />
          <div className="nav-button-container">
            <Button className="nav-button" variant="nav" id="nav-button" onClick={onExitPatientData}>
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultPage;
