import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';

import '../../stylesheets/LogList.scss';

function LogList(props) {
  function getVariant(level) {
    switch (level) {
      case 'info':
        return 'success';
      case 'warn':
        return 'warning';
      case 'error':
        return 'danger';
      case 'debug':
        return 'primary';
      default:
        return 'primary';
    }
  }
  const list = props.loggedMessages.map((log, i) => (
    <ListGroup.Item className="log-message" key={i}>
      <Badge pill bg={getVariant(log.level)} className="fixed-width-40px">
        {log.level}
      </Badge>
      {'\t'}
      {log.timestamp}: {log.message}
    </ListGroup.Item>
  ));
  return (
    <ListGroup className={props.listType}>
      <h1 className="page-subtitle">Log File</h1>
      {list}
    </ListGroup>
  );
}

export default LogList;
