import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Form, Row } from 'react-bootstrap';

function Extract(props) {
  const [configPath, setConfigPath] = useState('Select Config File');
  const [logPath, setLogPath] = useState('Select Log File');
  const [includeDebug, setIncludeDebug] = useState(false);
  const [filterStart, setFilterStart] = useState(false);
  const [filterEnd, setFilterEnd] = useState(false);
  const [fromDate] = useState('');
  const [toDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  function setConfig() {
    window.api.getFile().then((promise) => {
      // after file is picked, call setConfigPath(file_name). This will both set the path and change the button text
      if (promise.filePaths[0] !== undefined) {
        setConfigPath(promise.filePaths[0]);
      } else {
        setConfigPath('Error. Please try again');
      }
    });
  }

  function setLog() {
    window.api.getFile().then((promise) => {
      // after file is picked, call setConfigPath(file_name). This will both set the path and change the button text
      if (promise.filePaths[0] !== undefined) {
        setLogPath(promise.filePaths[0]);
      } else {
        setLogPath('Error. Please try again');
      }
    });
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
      if (value.extractedData === null) {
        history.push('/extraction-error');
      } else {
        history.push('/results');
      }
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
                  <Button className="generic-button file-picker" variant="outline-info" onClick={setConfig}>
                    {configPath}
                  </Button>
                </Form.Group>
                <Form.Group controlId="formLogPath">
                  <Form.Label className="form-label">Previous Log File</Form.Label>
                  <Button className="generic-button file-picker" variant="outline-info" onClick={setLog}>
                    {logPath}
                  </Button>
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
              <Button className="generic-button" size="lg" variant="outline-secondary">
                Cancel
              </Button>
            </LinkContainer>
            <Button className="generic-button" size="lg" variant="outline-secondary" onClick={useSubmit}>
              Submit
            </Button>
          </div>
        </div>
      )}
      {submitted && (
        <div>
          <p>The form as been submitted. Running extraction...</p>
          <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

export default Extract;
