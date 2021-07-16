import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import ResultHeader from './ResultHeader';
import PatientData from './OutputDisplay';
import ResultSidebar from './ResultSidebar';

import '../stylesheets/ResultPage.scss';

function ResultPage(props) {
  const [patientID, setPatientID] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={1} xs={3} className="sidebar-col">
            <ResultSidebar
              extractedData={props.extractedData}
              loggedMessages={props.loggedMessages}
              setPatientID={setPatientID}
              setShowLogs={setShowLogs}
              setShowSaveForm={setShowSaveForm}
            />
          </Col>
          <Col>
            <PatientData
              patientJson={props.extractedData[patientID]}
              extractedData={props.extractedData}
              id={patientID}
              showLogs={showLogs}
              loggedMessages={props.loggedMessages}
              showSaveForm={showSaveForm}
              setShowSaveForm={setShowSaveForm}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResultPage;
