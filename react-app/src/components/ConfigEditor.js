import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import ConfigForm from './ConfigForm';
import LinkButton from './LinkButton';

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
    <div className="flex-start-container">
      <h1 className="page-title">Configuration Editor</h1>
      {!showForm && (
        <div className="button-container">
          <Button className="vertical-menu-button" variant="outline-secondary" onClick={toggleForm}>
            Create New
          </Button>
          <LinkButton className="vertical-menu-button" variant="outline-secondary" text="Back" path="/" />
        </div>
      )}
      {showForm && <ConfigForm schema={schema} setShowForm={setShowForm} />}
    </div>
  );
}

export default ConfigEditor;
