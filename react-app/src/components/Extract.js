import React, { useState } from 'react';
import path from 'path';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Form, Row } from 'react-bootstrap';

function Extract(props) {
  const defaultPathToConfig = path.join('sample-extraction-data', 'config', 'csv.config.json');
  // const defaultPathToRunLogs = path.join('logs', 'run-logs.json');
  // FIXME - get rid of default config option

  const [configPath, setConfigPath] = useState(defaultPathToConfig);
  const [logPath, setLogPath] = useState('');
  const [includeDebug, setIncludeDebug] = useState(false);
  const [filterStart, setFilterStart] = useState(false);
  const [filterEnd, setFilterEnd] = useState(false);
  const [fromDate] = useState('');
  const [toDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  function onConfigChange(e) {
    setConfigPath(e.target.value);
  }

  function onLogChange(e) {
    setLogPath(e.target.value);
  }

  function onIncludeDebugChange() {
    setIncludeDebug(!includeDebug);
  }

  function onFilterStartChange() {
    setFilterStart(!filterStart);
  }

  function onFilterEndChange() {
    setFilterEnd(!filterEnd);
  }

  // function onFromDateChange(e) {
  //     setFromDate(e.target.value);
  // }

  // function onToDateChange(e) {
  //     setToDate(e.target.value);
  // }

  function useSubmit() {
    setSubmitted(!submitted);
    // allEntries parameter is true if it's not filtered by date, false if it is
    const filter = !(filterStart || filterEnd);
    window.api.extract(fromDate, toDate, configPath, logPath, includeDebug, filter).then((value) => {
      props.setExtractedData(value.extractedData);
      props.setLoggedMessages(value.loggedMessages);
      history.push('/results');
    });
  }

  function onReset() {
    setSubmitted(!submitted);
  }
  return (
    <div>
      <h1 className="page-title">Extract New</h1>
      {!submitted && (
        <div>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formConfigPath" className="mb-3">
                  <Form.Label className="form-label">Configuration File</Form.Label>
                  <Form.Control type="text" value={configPath} onChange={onConfigChange} />
                </Form.Group>
                <Form.Group controlId="formLogPath">
                  <Form.Label className="form-label">Previous Log File</Form.Label>
                  <Form.Control type="text" value={logPath} onChange={onLogChange} />
                </Form.Group>
                <Form.Group controlId="formIncludeDebug">
                  <Form.Check
                    type="checkbox"
                    label="Log output debugging information"
                    checked={includeDebug}
                    onChange={onIncludeDebugChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formIncludeStartDate">
                  <Form.Check
                    type="checkbox"
                    label="Filter by start date"
                    checked={filterStart}
                    onChange={onFilterStartChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formIncludeEndDate">
                  <Form.Check
                    type="checkbox"
                    label="Filter by end date"
                    checked={filterEnd}
                    onChange={onFilterEndChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <div className="nav-button-container">
            <LinkContainer to="/">
              <Button className="nav-button" size="lg" variant="outline-secondary">
                Cancel
              </Button>
            </LinkContainer>
            <Button className="nav-button" size="lg" variant="outline-secondary" onClick={useSubmit}>
              Submit
            </Button>
          </div>
        </div>
      )}
      {submitted && (
        <div>
          <p>The form as been submitted. Running extraction...</p>
          <Button className="nav-button" size="lg" variant="outline-secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

export default Extract;
