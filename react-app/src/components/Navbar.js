import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar as NavBar } from 'react-bootstrap';

function Navbar() {
  return (
    <NavBar fixed="top" variant="dark" expand="lg" className="navbar">
      <Container fluid>
        <NavBar.Brand as={Link} to="/" className="navbar-brand">
          mCODE Extractor
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/extract">
              Extract New
            </Nav.Link>
            <Nav.Link as={Link} to="/config-editor">
              Configuration Editor
            </Nav.Link>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}

export default Navbar;
