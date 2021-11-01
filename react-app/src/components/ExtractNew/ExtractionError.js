import React from 'react';
import LogList from '../Results/LogList';
import LinkButton from '../CommonComponents/LinkButton';

function ExtractionError(props) {
  return (
    <div>
      <h1 className="page-title">An error occurred during extraction.</h1>
      <p className="page-text text-centered">
        For more information, view the logs below and/or run extraction again with "Log output debugging information"
        checked.
      </p>
      <div className="button-container">
        <LinkButton className="generic-button" variant="outline-secondary" text="Extract New" path="/" />
      </div>
      <LogList loggedMessages={props.loggedMessages} listType="" />
    </div>
  );
}

export default ExtractionError;
