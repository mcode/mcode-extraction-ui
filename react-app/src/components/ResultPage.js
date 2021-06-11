import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PatientData from './PatientData';
import ResultHeader from './ResultHeader';
import ResultSidebar from './ResultSidebar';

import '../stylesheets/Home.css';

function ResultPage(props) {
  const [patientID, setPatientID] = useState(-1);

  return (
    <Container fluid>
      <Row>
        <Col>
          <ResultHeader />
        </Col>
      </Row>
      <Row>
        <Col>
          <ResultSidebar extractedData={props.extractedData} setPatientID={setPatientID} />
        </Col>
        <Col>
          {patientID < 0 && (
            <div>
              <p>Select a patient to view their information.</p>
            </div>
          )}
          {patientID >= 0 && (
            <div>
              <h1 className="page-title">Patient {this.state.patientID}</h1>
              <PatientData bundle={props.extractedData[patientID]} id={patientID} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ResultPage;
