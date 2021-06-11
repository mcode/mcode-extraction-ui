import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
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
  const list = props.extractedData.map((bundle, i) => <Result bundle={bundle} id={i} />);

  return (
    <div>
      <div className="result-table">{list}</div>
      <div className="nav-button-container">
        <Button className="nav-button" variant="nav" id="nav-button" onClick={onExitResultPage}>
          Exit
        </Button>
        <Button className="nav-button" type="submit" variant="nav" id="nav-button" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ResultSidebar;
