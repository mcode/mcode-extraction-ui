import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import ResultHeader from './ResultHeader';
import PatientData from './PatientData';
import ResultSidebar from './ResultSidebar';

import '../stylesheets/ResultPage.scss';

function ResultPage(props) {
  const [patientID, setPatientID] = useState(null);
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={3} className="sidebar-col">
            <ResultSidebar
              extractedData={props.extractedData}
              loggedMessages={props.loggedMessages}
              setPatientID={setPatientID}
              setShowLogs={setShowLogs}
            />
          </Col>
          <Col>
            <PatientData
              patientJson={props.extractedData[patientID]}
              id={patientID}
              showLogs={showLogs}
              loggedMessages={props.loggedMessages}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResultPage;
