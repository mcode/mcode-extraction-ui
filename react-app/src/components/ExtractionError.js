import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import LogList from './LogList';

function ExtractionError(props) {
  return (
    <div>
      <h3 className="page-subtitle text-centered">An error occurred during extraction.</h3>
      <p className="page-text">
        For more information, view the logs below and/or run extraction again with "Log output debugging information"
        checked.
      </p>
      <div className="button-container">
        <LinkContainer to="/extract">
          <Button className="generic-button" size="lg" variant="outline-secondary">
            Extract New
          </Button>
        </LinkContainer>
      </div>
      <LogList loggedMessages={props.loggedMessages} listType="" />
    </div>
  );
}

export default ExtractionError;
