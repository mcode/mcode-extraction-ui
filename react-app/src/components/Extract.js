import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

import FilePicker from './FilePicker';
import LinkButton from './LinkButton';

function Extract(props) {
  const [configPath, setConfigPath] = useState('No File Chosen');
  const [logPath, setLogPath] = useState('No File Chosen');
  const [includeDebug, setIncludeDebug] = useState(false);
  const [filterStart, setFilterStart] = useState(false);
  const [filterEnd, setFilterEnd] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  function setConfig() {
    window.api.getFile().then((promise) => {
      // after file is picked, call setConfigPath(file_name). This will both set the path and change the button text
      if (promise.filePaths[0] !== undefined) {
        setConfigPath(promise.filePaths[0]);
      }
    });
  }

  function clearConfig() {
    setConfigPath('No File Chosen');
  }

  function setLog() {
    window.api.getFile().then((promise) => {
      // after file is picked, call setConfigPath(file_name). This will both set the path and change the button text
      if (promise.filePaths[0] !== undefined) {
        setLogPath(promise.filePaths[0]);
      }
    });
  }

  function clearLog() {
    setLogPath('No File Chosen');
  }

  function onIncludeDebugChange() {
    setIncludeDebug(!includeDebug);
  }

  function onFilterStartChange() {
    setFilterStart(!filterStart);
    setFromDate('');
  }

  function onFilterEndChange() {
    setFilterEnd(!filterEnd);
    setToDate('');
  }

  function onFromDateChange(e) {
    setFromDate(e.target.value);
  }

  function onToDateChange(e) {
    setToDate(e.target.value);
  }

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
    <div className="page-container">
      <h1 className="page-title">Extract New</h1>
      {!submitted && (
        <div className="page-container">
          <Form className="form-container">
            <Row>
              <Col>
                <FilePicker
                  controlId="formConfigPath"
                  label="Select Configuration File"
                  buttonText="Upload File"
                  filePath={configPath}
                  onClick={setConfig}
                  onClear={clearConfig}
                  required={true}
                />
                <FilePicker
                  controlId="formLogPath"
                  label="Select Log File"
                  buttonText="Upload File"
                  filePath={logPath}
                  onClick={setLog}
                  onClear={clearLog}
                />
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
                {filterStart && (
                  <Form.Group controlId="formStartDate">
                    <Form.Control type="date" label="Start Date" onChange={onFromDateChange} value={fromDate} />
                  </Form.Group>
                )}
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
                {filterEnd && (
                  <Form.Group controlId="formEndDate">
                    <Form.Control type="date" label="End Date" onChange={onToDateChange} value={toDate} />
                  </Form.Group>
                )}
              </Col>
            </Row>
          </Form>
          <div className="nav-button-container">
            <LinkButton className="generic-button" size="lg" variant="outline-secondary" text="Cancel" path="/" />
            <Button className="generic-button" size="lg" variant="outline-secondary" onClick={useSubmit}>
              Submit
            </Button>
          </div>
        </div>
      )}
      {submitted && (
        <div className="flex-start-container">
          <p className="page-text text-centered">The form as been submitted. Running extraction...</p>
          <div className="button-container">
            <Button className="generic-button" size="lg" variant="outline-secondary" onClick={onReset}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Extract;
