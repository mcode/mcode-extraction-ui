import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import _ from 'lodash';
import ConfigForm from './ConfigForm';
import { getConfigSchema } from './schemaFormUtils';

function ConfigEditor() {
  const [showForm, setShowForm] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [configSchema, setConfigSchema] = useState({});
  const [configJSON, setConfigJSON] = useState({});

  function toggleForm() {
    getConfigSchema().then((schema) => {
      // eslint-disable-next-line no-param-reassign
      delete schema.description;
      setConfigSchema(schema);
      setConfigJSON({});
      setShowForm(!showForm);
    });
  }

  function closeForm() {
    setShowForm(false);
  }

  function loadFile() {
    getConfigSchema().then((schema) => {
      // eslint-disable-next-line no-param-reassign
      delete schema.description;
      setConfigSchema(schema);
    });
    window.api
      .getFile(['json'])
      .then((result) => {
        if (result.filePaths[0] !== undefined) {
          return window.api.readFile(result.filePaths[0]);
        }
        return null;
      })
      .then((result) => {
        if (result !== null) {
          const config = JSON.parse(result);
          // Add ids to the extractors
          if (config.extractors) {
            config.extractors = config.extractors.map((e) => ({ ...e, id: _.uniqueId() }));
          }
          setConfigJSON(config);
          return true;
        }
        return null;
      })
      .then((result) => {
        if (result) {
          setShowForm(true);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      });
  }

  return (
    <>
      <h1 className="page-title">Configuration Editor</h1>
      <div className="page-content">
        {!showForm && (
          <>
            <div className="button-container">
              <Button className="vertical-menu-button" variant="outline-secondary" onClick={toggleForm}>
                Create New
              </Button>
              <Button className="vertical-menu-button" variant="outline-secondary" onClick={loadFile}>
                Load File
              </Button>
            </div>
            {showErrorAlert && (
              <Alert variant="danger" show={showErrorAlert} onClose={() => setShowErrorAlert(false)} dismissible>
                <Alert.Heading>Error: Unable to load file</Alert.Heading>
                <p>{errorMessage}</p>
              </Alert>
            )}
          </>
        )}
        {showForm && (
          <>
            <ConfigForm
              configJSON={configJSON}
              resetFormData={setConfigJSON}
              setShowForm={setShowForm}
              schema={configSchema}
            />
            <div className="nav-button-container">
              <Button className="generic-button" size="lg" variant="outline-secondary" onClick={closeForm}>
                Back
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ConfigEditor;
