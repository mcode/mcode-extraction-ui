import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function ResultHeader() {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Results</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default ResultHeader;
