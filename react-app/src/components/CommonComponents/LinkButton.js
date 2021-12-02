import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LinkButton(props) {
  const history = useHistory();
  const onClick = () => {
    history.push(props.path);
  };
  return (
    <Button className={props.className} size={props.size} variant={props.variant} onClick={onClick}>
      {props.text}
    </Button>
  );
}

export default LinkButton;
