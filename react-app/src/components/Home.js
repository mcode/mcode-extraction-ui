/*
This is the landing page that will display when users first open the app. It has a title and a menu.
*/

import React from 'react';
import LinkButton from './LinkButton';

function Home() {
  return (
    <div>
      <h1 className="page-title">Extractor UI</h1>
      <div className="button-container">
        <LinkButton className="vertical-menu-button" variant="outline-secondary" text="Extract New" path="/extract" />
        <LinkButton
          className="vertical-menu-button"
          variant="outline-secondary"
          text="Configuration File Editor"
          path="/config-editor"
        />
      </div>
    </div>
  );
}

export default Home;
