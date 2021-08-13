import React, { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import FilePicker from './FilePicker';

function Extractor(props) {
  console.log(props);
  const [csvPath, setCsvPath] = useState(
    props.formData.constructorArgs.filePath ? props.formData.constructorArgs.filePath : 'No File Selected',
  );
  const [extractorLabel, setExtractorLabel] = useState(props.formData.label ? props.formData.label : '');

  function onExtractorLabelChange(e) {
    console.log(e);
    props.onExtractorLabelChange(e.target.value, props.eventKey);
    setExtractorLabel(e.target.value);
  }

  function onCsvPathChange(newPath) {
    setCsvPath(newPath);
    props.onCsvPathChange(newPath, props.eventKey);
  }

  function onClear() {
    setCsvPath('No File Selected');
    props.onCsvPathChange('No File Selected', props.eventKey);
  }
  function getFile() {
    window.api.getFile().then((promise) => {
      if (promise.filePaths[0] !== undefined) {
        setCsvPath(promise.filePaths[0]);
        props.onCsvPathChange(promise.filePaths[0], props.eventKey);
      }
    });
  }

  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header>{props.formData.type}</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Extractor Label</Form.Label>
          <Form.Control type="text" value={extractorLabel} onChange={onExtractorLabelChange} />
        </Form.Group>
        <FilePicker
          buttonText="Select File"
          controlId={props.label}
          onClick={getFile}
          setFilePath={onCsvPathChange}
          filePath={csvPath}
          label="CSV File Path"
          onClear={onClear}
          required={props.required}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Extractor;
