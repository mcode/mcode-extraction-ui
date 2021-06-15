import React from 'react';
import { Button, Accordion } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ResultHeader from './ResultHeader';
import Result from './Result';

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
    <div className="sidebar d-flex flex-column">
      <ResultHeader />
      <div className="sidebar-interior">
        <Accordion defaultActiveKey="0" flush>
          {list}
        </Accordion>
      </div>
      <div className="nav-button-container">
        <Button className="nav-button" size="lg" variant="outline-secondary" onClick={onExitResultPage}>
          Exit
        </Button>
        <Button className="nav-button" siz="lg" variant="outline-secondary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

// DELETE ME
//       <h1 className="page-subtitle">Results</h1>
export default ResultSidebar;
