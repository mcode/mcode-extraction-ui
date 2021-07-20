import React from 'react';
import LogList from './LogList';
import LinkButton from './LinkButton';

function ExtractionError(props) {
  return (
    <div>
      <h3 className="page-subtitle text-centered">An error occurred during extraction.</h3>
      <p className="page-text">
        For more information, view the logs below and/or run extraction again with "Log output debugging information"
        checked.
      </p>
      <div className="button-container">
        <LinkButton className="generic-button" variant="outline-secondary" text="Extract New" path="/extract" />
      </div>
      <LogList loggedMessages={props.loggedMessages} listType="" />
    </div>
  );
}

export default ExtractionError;
