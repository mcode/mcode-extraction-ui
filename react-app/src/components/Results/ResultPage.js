import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import OutputDisplay from './OutputDisplay';
import ResultSidebar from './ResultSidebar';
import LinkButton from '../CommonComponents/LinkButton';

import '../../stylesheets/ResultPage.scss';

function ResultPage(props) {
  const [patientID, setPatientID] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);

  function onSave() {
    setShowSaveForm(true);
  }

  return (
    <>
      <h1 className="page-title">Results</h1>
      <div className="page-content">
        <Container fluid className="full-height-scroll">
          <Row className="full-height-scroll">
            <Col sm={1} xs={3} className="sidebar-col">
              <ResultSidebar
                extractedData={props.extractedData}
                loggedMessages={props.loggedMessages}
                setPatientID={setPatientID}
                setShowLogs={setShowLogs}
                setShowSaveForm={setShowSaveForm}
              />
            </Col>
            <Col className="full-height-scroll">
              <OutputDisplay
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
        <div className="nav-button-container">
          <LinkButton className="generic-button" size="lg" variant="outline-secondary" path={'/'} text="Exit" />
          <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default ResultPage;
