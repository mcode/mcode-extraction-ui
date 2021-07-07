import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';

import '../stylesheets/LogList.scss';

function LogList(props) {
  function getVariant(level) {
    if (level === 'info') {
      return 'success';
    }
    if (level === 'warn') {
      return 'warning';
    }
    if (level === 'error') {
      return 'danger';
    }
    if (level === 'debug') {
      return 'primary';
    }
    return 'primary';
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
  return <ListGroup className={props.listType}>{list}</ListGroup>;
}

export default LogList;
