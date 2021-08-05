import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

import ConfigForm from './ConfigForm';
import LinkButton from './LinkButton';
import { getConfigSchema } from './schemaFormUtils';

function ConfigEditor() {
  const [showForm, setShowForm] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [configSchema, setConfigSchema] = useState({});
  const [configJSON, setConfigJSON] = useState({
    $id: 'https://example.com/person.schema.json',
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Person',
    type: 'object',
    properties: {
      placeholder: {
        type: 'string',
        description: 'This is a placeholder for an actual config JSON',
      },
    },
  });

  function toggleForm() {
    getConfigSchema().then((schema) => {
      setConfigSchema(schema);
    });
    setShowForm(!showForm);
  }

  function loadFile() {
    getConfigSchema().then((schema) => {
      setConfigSchema(schema);
    });
    window.api
      .getFile()
      .then((result) => {
        if (result.filePaths[0] !== undefined) {
          return window.api.readFile(result.filePaths[0]);
        }
        return null;
      })
      .then((result) => {
        if (result !== null) {
          setConfigJSON(JSON.parse(result));
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
    <div className="flex-start-container">
      <h1 className="page-title">Configuration Editor</h1>
      {!showForm && (
        <div className="button-container">
          <Button className="vertical-menu-button" variant="outline-secondary" onClick={toggleForm}>
            Create New
          </Button>
          <Button className="vertical-menu-button" variant="outline-secondary" onClick={loadFile}>
            Load File
          </Button>
          <LinkButton className="vertical-menu-button" variant="outline-secondary" text="Back" path="/" />
        </div>
      )}
      {showErrorAlert && (
        <div className="flex-end-container">
          <Alert variant="danger" show={showErrorAlert} onClose={() => setShowErrorAlert(false)} dismissible>
            <Alert.Heading>Error: Unable to load file</Alert.Heading>
            <p>{errorMessage}</p>
          </Alert>
        </div>
      )}
      {showForm && <ConfigForm configJSON={configJSON} setShowForm={setShowForm} schema={configSchema} />}
    </div>
  );
}

export default ConfigEditor;
