import React, { ReactElement } from 'react';
import {
  Navbar, // Nav, Form, Button, NavDropdown, FormControl,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() : ReactElement {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
    </Navbar>
  );
}

export default Navigation;
