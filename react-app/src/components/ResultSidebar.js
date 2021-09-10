import React from 'react';
import { Accordion } from 'react-bootstrap';
import Result from './Result';

function ResultSidebar(props) {
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
    <div className="sidebar">
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey={-1}>
          <Accordion.Header
            onClick={() => {
              props.setPatientID(null);
              props.setShowLogs(true);
              props.setShowSaveForm(false);
            }}
          >
            Logger Messages
          </Accordion.Header>
          {getLoggerStats()}
        </Accordion.Item>
        {list}
      </Accordion>
    </div>
  );
}

export default ResultSidebar;
