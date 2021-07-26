import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import ConfigForm from './ConfigForm';
import LinkButton from './LinkButton';

function ConfigEditor() {
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(!showForm);
  }

  function loadFile() {
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
        console.log(error);
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
      {showForm && <ConfigForm configJSON={configJSON} setShowForm={setShowForm} />}
    </div>
  );
}

export default ConfigEditor;
