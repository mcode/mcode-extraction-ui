import React from 'react';
import { Button, Form } from 'react-bootstrap';

/*
PROPS:
label - text that will display above picker. Optional.
buttonText - text that will display on first button, informing the user of its purpose
filePath - variable to store the file path (type string) selected by the user.
onClick - function to call when the first button is clicked
onClear - function to reset filePath
required - boolean telling the picker whether to use required styling or not. Optional.
*/
export default function FilePicker(props) {
  return (
    <Form.Group controlId={props.controlId} className="mb-3">
      {props.label && (
        <Form.Label className="form-label">
          {props.label}
          {props.required && '*'}
        </Form.Label>
      )}
      <div className="file-picker-box">
        <div className="file-button-container">
          <Button className="generic-button narrow-button" variant="outline-info" onClick={props.onClick}>
            {props.buttonText}
          </Button>
          <Button className="generic-button narrow-button" variant="outline-info" onClick={props.onClear}>
            Clear
          </Button>
        </div>
        <Form.Label className="form-label file-name">{props.filePath}</Form.Label>
      </div>
    </Form.Group>
  );
}
