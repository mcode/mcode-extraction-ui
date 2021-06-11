import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Drawer } from 'react-bootstrap-drawer';
import Result from './Result';

import 'react-bootstrap-drawer/lib/style.css';

function ResultSidebar(props) {
  const history = useHistory();
  function onExitResultPage() {
    // reset data values and return to home page
    history.push('/extract');
  }

  function onSave() {
    // Save the results permanently somehow
  }
  const list = props.extractedData.map((bundle, i) => (
    <Result bundle={bundle} id={i} setPatientID={props.setPatientID} key={i} />
  ));

  return (
    <Drawer className="d-flex flex-column">
      <ListGroup>{list}</ListGroup>
      <div className="nav-button-container">
        <Button className="nav-button" variant="nav" id="nav-button" onClick={onExitResultPage}>
          Exit
        </Button>
        <Button className="nav-button" type="submit" variant="nav" id="nav-button" onClick={onSave}>
          Save
        </Button>
      </div>
    </Drawer>
  );
}

export default ResultSidebar;
