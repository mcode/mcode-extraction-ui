import React, { useState } from 'react';
import { Alert, Button, Dropdown } from 'react-bootstrap';
import _ from 'lodash';
import EditorForm from './EditorForm';
import { getConfigSchema } from './helpers/schemaFormUtils';

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
          // convert a string list of to emails to an array
          if (config.notificationInfo) {
            if (typeof config.notificationInfo.to === 'string') {
              config.notificationInfo.to = config.notificationInfo.to.split(',').map((e) => e.trim());
            }
          }
          // Add ids to the extractors and handle mask "all"
          if (config.extractors) {
            config.extractors = config.extractors.map((e) => {
              if (e.constructorArgs && e.constructorArgs.mask === 'all') {
                return {
                  ...e,
                  constructorArgs: {
                    ...e.constructorArgs,
                    mask: [
                      'genderAndSex',
                      'mrn',
                      'name',
                      'address',
                      'birthDate',
                      'language',
                      'ethnicity',
                      'race',
                      'telecom',
                      'multipleBirth',
                      'photo',
                      'contact',
                      'generalPractitioner',
                      'managingOrganization',
                      'link',
                    ],
                  },
                  id: _.uniqueId(),
                };
              }
              return { ...e, id: _.uniqueId() };
            });
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

  function loadTemplate(filePath) {
    getConfigSchema().then((schema) => {
      // eslint-disable-next-line no-param-reassign
      delete schema.description;
      setConfigSchema(schema);
    });
    window.api
      .readFile(filePath)
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
          setShowErrorAlert(true);
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
              <Dropdown className="vertical-menu-button" variant="outline-secondary">
                <Dropdown.Toggle className="vertical-menu-button" variant="outline-secondary">
                  Create From Template
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => loadTemplate('./react-app/src/components/ConfigEditor/templates/mcode.json')}
                  >
                    mCODE
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => loadTemplate('./react-app/src/components/ConfigEditor/templates/icare.json')}
                  >
                    ICARE
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
            <EditorForm
              configJSON={configJSON}
              resetFormData={setConfigJSON}
              setShowForm={setShowForm}
              schema={configSchema}
              closeForm={closeForm}
            />
            {showErrorAlert && (
              <Alert variant="info" show={showErrorAlert} onClose={() => setShowErrorAlert(false)} dismissible>
                <Alert.Heading>Created config from template</Alert.Heading>
                <p>
                  Extractors have been added for you, but CSV file paths / URLs and other fields will still need to be
                  added
                </p>
              </Alert>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ConfigEditor;
