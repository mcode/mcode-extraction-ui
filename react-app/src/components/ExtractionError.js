import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, ListGroup } from 'react-bootstrap';

function ExtractionError(props) {
  const list = props.loggedMessages.map((message) => <ListGroup.Item key={message}>{message}</ListGroup.Item>);
  return (
    <div>
      <h3 className="page-subtitle">An error occurred during extraction.</h3>
      <p className="page-text">
        For more information, view the logs below and/or run extraction again with "Log output debugging information"
        checked.
      </p>
      <div className="button-container">
        <LinkContainer to="/extract">
          <Button className="nav-button" size="lg" variant="outline-secondary">
            Extract New
          </Button>
        </LinkContainer>
      </div>
      <ListGroup>{list}</ListGroup>
    </div>
  );
}

export default ExtractionError;
