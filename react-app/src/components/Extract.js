import React from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Col, Form, Row } from 'react-bootstrap'

import '../stylesheets/Page.css';

class Extract extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            configPath: "",
            logPath: "",
            includeDebug: false,
            filterStart: false,
            filterEnd: false
        }

        this.onConfigFileChange = this.onConfigFileChange.bind;
        this.onLogFileChange = this.onLogFileChange.bind;
        this.onIncludeDebugChange = this.onIncludeDebugChange.bind;
        this.onFilterStartChange = this.onFilterStartChange.bind;
        this.onFilterEndChange = this.onFilterEndChange.bind;
        this.onSubmit = this.onSubmit.bind(this);
    }

    onConfigFileChange(e) {
        this.setState({
            configPath: e.target.value
        });
    }

    onLogFileChange(e) {
        this.setState({
            logPath: e.target.value
        });
    }

    onIncludeDebugChange(e) {
        this.setState({
            includeDebug: e.target.value
        });
    }

    onFilterStartChange(e) {
        this.setState({
            filterStart: e.target.value
        });
    }

    onFilterEndChange(e) {
        this.setState({
            filterEnd: e.target.value
        });
    }

    onSubmit(e) {
        console.log(e);
        console.log(this.configPath);
    }

    render() {
        this.whatever = 10;
        return <div>
            <h1 className="page-title">Extract New</h1>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="formConfigPath" className="mb-3">
                            <Form.Label className="form-label" >Configuration File</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="formLogPath">
                            <Form.Label className="form-label" >Previous Log File</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="formIncludeDebug">
                            <Form.Check type="checkbox" label="Log output debugging information" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formIncludeStartDate">
                            <Form.Check type="checkbox" label="Filter by start date" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formIncludeEndDate">
                            <Form.Check type="checkbox" label="Filter by end date" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <div className="nav-button-container">
                <LinkContainer to="/">
                    <button className="nav-button" variant="nav" id="nav-button">Cancel</button>
                </LinkContainer>
                <button className="nav-button" type="submit" variant="nav" id="nav-button" onClick={this.onSubmit}>Submit</button>
            </div>
        </div>
    }
}


export default Extract;