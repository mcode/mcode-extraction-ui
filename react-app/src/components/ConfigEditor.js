import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import ConfigForm from './ConfigForm';

function ConfigEditor() {
  const [showForm, setShowForm] = useState(false);
  const schema = {
    $id: 'https://example.com/person.schema.json',
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Person',
    type: 'object',
    properties: {
      placeholder: {
        type: 'string',
        description: 'This is a placeholder for an actual config JSON schema',
      },
    },
  };

  function toggleForm() {
    setShowForm(!showForm);
  }
  return (
    <div className="page-container">
      <h1 className="page-title">Configuration Editor</h1>
      {!showForm && (
        <div className="button-container">
          <Button className="vertical-menu-button" variant="outline-secondary" onClick={toggleForm}>
            Create New
          </Button>

          <Button className="vertical-menu-button" variant="outline-secondary" onClick={toggleForm}>
            <LinkContainer to="/">
              <p className="button-text">Back</p>
            </LinkContainer>
          </Button>
        </div>
      )}
      {showForm && <ConfigForm schema={schema} setShowForm={setShowForm} />}
    </div>
  );
}

export default ConfigEditor;
