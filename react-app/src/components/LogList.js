import React from 'react';
import { ListGroup } from 'react-bootstrap';

import '../stylesheets/LogList.scss';

function LogList(props) {
  const list = props.loggedMessages.map((log, i) => (
    <ListGroup.Item className="log-message" key={i}>
      {log.message}
    </ListGroup.Item>
  ));
  return <ListGroup className={props.listType}>{list}</ListGroup>;
}

export default LogList;
