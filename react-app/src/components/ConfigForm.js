import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Form from '@rjsf/core';
import metaSchemaDraft06 from 'ajv/lib/refs/json-schema-draft-06.json';
import { uiSchema, widgets, fields } from './schemaFormUtils';

function ConfigForm(props) {
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function onSaveAs(configJSON) {
    window.api
      .saveConfigAs(configJSON)
      .then((result) => {
        if (result !== null) {
          // if saveOutput() returns true, then the save process succeeded
          setShowSavedAlert(true);
          setSavedMessage('Files saved to '.concat(result));
        }
        // If result is null, the process was cancelled, and nothing should be done.
      })
      .catch((error) => {
        setShowErrorAlert(true);
        setErrorMessage(error.message);
        setShowSavedAlert(false);
      });
  }

  function cleanFormData(formData) {
    formData.extractors.forEach((extractor) => {
      // eslint-disable-next-line no-param-reassign
      delete extractor.id;
    });
    return formData;
  }

  function onSubmit({ formData }) {
    const configObj = cleanFormData(formData);
    onSaveAs(configObj);
    props.resetFormData(formData);
  }

  return (
    <>
      <Form
        className="form-container"
        // Content for the editor
        schema={props.schema}
        uiSchema={uiSchema}
        widgets={widgets}
        fields={fields}
        formData={props.configJSON}
        onSubmit={onSubmit}
        // Validation information
        additionalMetaSchemas={[metaSchemaDraft06]}
        customFormats={{
          'comma-separated-emails': {
            type: 'string',
            validate: (emails) => {
              // this is Ajv's regex for email format (https://github.com/ajv-validator/ajv-formats/blob/master/src/formats.ts#L106)
              const emailRegex = new RegExp(
                /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
              );
              return emails.split(',').every((email) => emailRegex.test(email.trim()));
            },
          },
          'email-with-name': {
            type: 'string',
            validate: (email) => {
              // this is Ajv's regex for email format (https://github.com/ajv-validator/ajv-formats/blob/master/src/formats.ts#L106)
              const emailRegex = new RegExp(
                /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
              );
              return emailRegex.test(email.trim().split(' ').pop());
            },
          },
        }}
      >
        <Button className="generic-button" variant="outline-primary" type="submit">
          Save
        </Button>
      </Form>
      {showSavedAlert && (
        <Alert variant="success" show={showSavedAlert} onClose={() => setShowSavedAlert(false)} dismissible>
          <Alert.Heading>Files saved</Alert.Heading>
          <p>{savedMessage}</p>
        </Alert>
      )}
      {showErrorAlert && (
        <Alert variant="danger" show={showErrorAlert} onClose={() => setShowErrorAlert(false)} dismissible>
          <Alert.Heading>Error: Unable to save file</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
    </>
  );
}

export default ConfigForm;
