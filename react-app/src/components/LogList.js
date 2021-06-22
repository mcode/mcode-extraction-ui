import React from 'react';
import { ListGroup } from 'react-bootstrap';

import '../stylesheets/LogList.scss';

function LogList(props) {
  const list = props.loggedMessages.map((message, i) => (
    <ListGroup.Item className="log-message" key={i}>
      {message}
    </ListGroup.Item>
  ));
  return <ListGroup className="log-list">{list}</ListGroup>;
}

export default LogList;
