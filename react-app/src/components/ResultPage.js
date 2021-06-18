import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import ResultHeader from './ResultHeader';
import PatientData from './PatientData';
import ResultSidebar from './ResultSidebar';

import '../stylesheets/ResultPage.scss';

function ResultPage(props) {
  const [patientID, setPatientID] = useState(null);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3} className="sidebar-col">
            <ResultSidebar
              extractedData={props.extractedData}
              setPatientID={setPatientID}
              loggedMessages={props.loggedMessages}
            />
          </Col>
          <Col>
            <PatientData
              patientJson={props.extractedData[patientID]}
              id={patientID}
              loggedMessages={props.loggedMessages}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResultPage;
