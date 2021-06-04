import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Form, Row } from 'react-bootstrap';

import '../stylesheets/Page.css';

class Extract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      configPath: '',
      logPath: '',
      includeDebug: false,
      filterStart: false,
      filterEnd: false,
    };
  }

  onConfigFileChange = (e) => this.setState({ configPath: e.target.value });

  onLogFileChange = (e) => this.setState({ logPath: e.target.value });

  onIncludeDebugChange = () => this.setState({ includeDebug: !this.state.includeDebug });

  onFilterStartChange = () => this.setState({ filterStart: !this.state.filterStart });

  onFilterEndChange = () => this.setState({ filterEnd: !this.state.filterEnd });

  onSubmit = () => {
    // placeholder to avoid errors -- the filled-in version of this function in extractor-api uses "this"
    this.setState({
      configPath: this.state.configPath,
    });
  };

  render() {
    return (
      <div>
        <h1 className="page-title">Extract New</h1>
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
    );
  }
}

export default Extract;
