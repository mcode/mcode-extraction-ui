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
        <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
          <ResultSidebar extractedData={props.extractedData} setPatientID={setPatientID} />
        </Col>
        <Col>
          <PatientData patientJson={props.extractedData[patientID]} id={patientID} />
        </Col>
      </Row>
    </Container>
  );
}

export default ResultPage;
