import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import ConfigForm from './ConfigForm';

function ConfigEditor() {
  const [showForm, setShowForm] = useState(false);

  function toggleForm() {
    setShowForm(!showForm);
  }
  return (
    <div>
      <h1 className="page-title">Configuration Editor</h1>
      {!showForm && (
        <div className="button-container">
          <Button className="vertical-menu-button" variant="outline-secondary" onClick={toggleForm}>
            Create New
          </Button>
        </div>
      )}
      {showForm && <ConfigForm />}
    </div>
  );
}

export default ConfigEditor;
