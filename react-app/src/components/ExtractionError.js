import React from 'react';
import LogList from './LogList';
import LinkButton from './LinkButton';

function ExtractionError(props) {
  return (
    <div>
      <h1 className="page-title">An error occurred during extraction.</h1>
      <p className="page-text text-centered">
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
