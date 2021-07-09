/*
This is the landing page that will display when users first open the app. It has a title and a menu.
*/

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import '../stylesheets/Home.scss';

function Home() {
  return (
    <div>
      <h1 className="page-title">Extractor UI</h1>
      <div className="button-container">
        <LinkContainer to="/extract">
          <Button className="home-menu-button" variant="outline-secondary">
            Extract New
          </Button>
        </LinkContainer>
        <LinkContainer to="/config-menu">
          <Button className="home-menu-button" variant="outline-secondary">
            Configuration File Editor
          </Button>
        </LinkContainer>
      </div>
    </div>
  );
}

export default Home;
