import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar as NavBar } from 'react-bootstrap';

function Navbar() {
  return (
    <NavBar collapseOnSelect fixed="top" variant="dark" expand="lg" className="navbar">
      <Container fluid>
        <NavBar.Brand as={NavLink} to="/" className="navbar-brand">
          mCODE Extractor
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey="home" exact as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link eventKey="extract" exact as={NavLink} to="/extract">
              Extract New
            </Nav.Link>
            <Nav.Link eventKey="config-editor" exact as={NavLink} to="/config-editor">
              Configuration Editor
            </Nav.Link>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}

export default Navbar;
