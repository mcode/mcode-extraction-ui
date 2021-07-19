import React from 'react';
import { Button, Accordion } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ResultHeader from './ResultHeader';
import Result from './Result';

function ResultSidebar(props) {
  const history = useHistory();

  function onExitResultPage() {
    // reset data values and return to home page
    history.push('/extract');
  }

  function onSave() {
    props.setShowSaveForm(true);
  }

  function getLoggerStats() {
    let errors = 0;
    let warnings = 0;

    props.loggedMessages.forEach((log) => {
      if (log.level === 'error') {
        errors += 1;
      }
      if (log.level === 'warn') {
        warnings += 1;
      }
    });

    return (
      <Accordion.Body>
        <p>Errors: {errors}</p>
        <p>Warnings: {warnings}</p>
      </Accordion.Body>
    );
  }

  const list = props.extractedData.map((bundle, i) => (
    <Result
      bundle={bundle}
      id={i}
      setPatientID={props.setPatientID}
      key={i}
      setShowLogs={props.setShowLogs}
      setShowSaveForm={props.setShowSaveForm}
    />
  ));

  return (
    <div className="sidebar d-flex flex-column">
      <ResultHeader />
      <div className="sidebar-interior">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey={-1}>
            <Accordion.Header
              onClick={() => {
                props.setPatientID(null);
                props.setShowLogs(true);
                props.setShowSaveForm(false);
              }}
            >
              Log File
            </Accordion.Header>
            {getLoggerStats()}
          </Accordion.Item>
          {list}
        </Accordion>
      </div>
      <div className="sidebar-button-container">
        <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onExitResultPage}>
          Exit
        </Button>
        <Button className="generic-button" siz="lg" variant="outline-secondary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ResultSidebar;
