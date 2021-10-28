import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Extract from './components/ExtractNew/Extract';
import Navbar from './components/CommonComponents/Navbar';
import ResultPage from './components/Results/ResultPage';
import ExtractionError from './components/ExtractNew/ExtractionError';
import ConfigEditor from './components/ConfigEditor/ConfigEditor';

import './stylesheets/custom.scss';
import './stylesheets/Page.scss';

function App() {
  const [extractedData, setExtractedData] = useState([]);
  const [loggedMessages, setLoggedMessages] = useState([]);

  return (
    <div>
      <Router>
        <Navbar />
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Extract setExtractedData={setExtractedData} setLoggedMessages={setLoggedMessages} />
            </Route>
            <Route exact path="/results">
              <ResultPage
                extractedData={extractedData}
                setExtractedData={setExtractedData}
                loggedMessages={loggedMessages}
              />
            </Route>
            <Route exact path="/extraction-error">
              <ExtractionError loggedMessages={loggedMessages} />
            </Route>
            <Route exact path="/config-editor">
              <ConfigEditor />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
