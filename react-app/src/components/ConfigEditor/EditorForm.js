import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Form from '@rjsf/bootstrap-4';
import _ from 'lodash';
import metaSchemaDraft06 from 'ajv/lib/refs/json-schema-draft-06.json';
import { uiSchema, widgets, fields } from './helpers/schemaFormUtils';

function EditorForm(props) {
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
    const saveData = _.cloneDeep(formData);
    saveData.extractors.forEach((extractor) => {
      // eslint-disable-next-line no-param-reassign
      delete extractor.id;
    });
    return saveData;
  }

  function transformErrors(errors) {
    const filteredErrors = _.cloneDeep(errors);
    const emailError = filteredErrors.find(
      (error) => error.name === 'format' && error.params.format === 'comma-separated-emails',
    );
    if (emailError) {
      emailError.message = 'Please include a list of comma separated email addresses';
      const arrayErrorIndex = filteredErrors.findIndex(
        (error) => error.property === '.notificationInfo.to' && error.name === 'type',
      );
      filteredErrors.splice(arrayErrorIndex, 1);
      const anyOfErrorIndex = filteredErrors.findIndex(
        (error) => error.property === '.notificationInfo.to' && error.name === 'oneOf',
      );
      filteredErrors.splice(anyOfErrorIndex, 1);
    }
    return filteredErrors;
  }

  function onSubmit({ formData }) {
    const configObj = cleanFormData(formData);
    onSaveAs(configObj);
    props.resetFormData(formData);
  }

  return (
    <>
      <Form
        className="config-form form-container"
        // Content for the editor
        schema={props.schema}
        uiSchema={uiSchema}
        widgets={widgets}
        fields={fields}
        formData={props.configJSON}
        onSubmit={onSubmit}
        transformErrors={transformErrors}
        // Validation information
        additionalMetaSchemas={[metaSchemaDraft06]}
        customFormats={{
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
        <div className="config-form-button-container nav-button-container">
          <Button className="generic-button" size="lg" variant="outline-secondary" onClick={props.closeForm}>
            Back
          </Button>
          <Button className="generic-button" variant="outline-primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
      <Alert
        className="nav-button-alert"
        variant="success"
        show={showSavedAlert}
        onClose={() => setShowSavedAlert(false)}
        dismissible
        transition
      >
        <Alert.Heading>Files saved</Alert.Heading>
        <p>{savedMessage}</p>
      </Alert>
      <Alert
        className="nav-button-alert"
        variant="danger"
        show={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        dismissible
        transition
      >
        <Alert.Heading>Error: Unable to save file</Alert.Heading>
        <p>{errorMessage}</p>
      </Alert>
    </>
  );
}

export default EditorForm;
