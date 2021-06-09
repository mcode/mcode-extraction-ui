import React from 'react';
import path from 'path';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Form, Row } from 'react-bootstrap';

import '../stylesheets/Page.css';

class Extract extends React.Component {
  constructor(props) {
    super(props);

    const defaultPathToConfig = path.join('test', 'config', 'csv.config.json');
    const defaultPathToRunLogs = path.join('logs', 'run-logs.json');
    // FIXME - get rid of default config option
    this.state = {
      configPath: defaultPathToConfig,
      logPath: defaultPathToRunLogs,
      includeDebug: false,
      filterStart: false,
      filterEnd: false,
      fromDate: '',
      toDate: '',
      submitted: false,
    };
  }

  onConfigFileChange = (e) => this.setState({ configPath: e.target.value });

  onLogFileChange = (e) => this.setState({ logPath: e.target.value });

  onIncludeDebugChange = () => this.setState({ includeDebug: !this.state.includeDebug });

  onFilterStartChange = () => this.setState({ filterStart: !this.state.filterStart });

  onFilterEndChange = () => this.setState({ filterEnd: !this.state.filterEnd });

  onSubmit = () => {
    this.setState({
      submitted: !this.state.submitted,
    });

    // allEntries parameter is true if it's not filtered by date, false if it is
    const filter = !(this.state.filterStart || this.state.filterEnd);
    window.api
      .extract(
        this.state.fromDate,
        this.state.toDate,
        this.state.configPath,
        this.state.runLogPath,
        this.state.includeDebug,
        filter,
      )
      .then((value) => {
        // do things with result
        console.log(value);
      });
  };

  render() {
    return (
      <div>
        <h1 className="page-title">Extract New</h1>
        {!this.state.submitted && (
          <div>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formConfigPath" className="mb-3">
                    <Form.Label className="form-label">Configuration File</Form.Label>
                    <Form.Control onChange={this.onConfigFileChange} type="text" value={this.state.configPath} />
                  </Form.Group>
                  <Form.Group controlId="formLogPath">
                    <Form.Label className="form-label">Previous Log File</Form.Label>
                    <Form.Control onChange={this.onLogFileChange} type="text" value={this.state.logPath} />
                  </Form.Group>
                  <Form.Group controlId="formIncludeDebug">
                    <Form.Check
                      checked={this.state.includeDebug}
                      onChange={this.onIncludeDebugChange}
                      type="checkbox"
                      label="Log output debugging information"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formIncludeStartDate">
                    <Form.Check
                      checked={this.state.filterStart}
                      onChange={this.onFilterStartChange}
                      type="checkbox"
                      label="Filter by start date"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formIncludeEndDate">
                    <Form.Check
                      checked={this.state.filterEnd}
                      onChange={this.onFilterEndChange}
                      type="checkbox"
                      label="Filter by end date"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <div className="nav-button-container">
              <LinkContainer to="/">
                <Button variant="danger">Cancel</Button>
              </LinkContainer>
              <Button type="submit" variant="info" onClick={this.onSubmit}>
                Submit
              </Button>
            </div>
          </div>
        )}
        {this.state.submitted && (
          <div>
            <p>The form as been submitted. Running extraction...</p>
            <Button className="nav-button" type="submit" variant="nav" id="nav-button" onClick={this.onSubmit}>
              Reset
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Extract;
