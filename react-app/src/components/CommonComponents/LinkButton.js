import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LinkButton(props) {
  return (
    <Link to={props.path}>
      <Button className={props.className} variant={props.variant} size={props.size}>
        {props.text}
      </Button>
    </Link>
  );
}

export default LinkButton;
