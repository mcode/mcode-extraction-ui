import React, { useState } from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';

function CommonExtractorArgs(props) {
  const [baseFhirUrl, setBaseFhirUrl] = useState(props.formData?.baseFhirUrl || null);
  const [requestHeaders, setRequestHeaders] = useState(props.formData?.requestHeaders || null);

  const { SchemaField } = props.registry.fields;

  return (
    <div className="config-section-accordion">
      {props.uiSchema['ui:label'] && <label>{props.uiSchema['ui:label']}</label>}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <legend>Common Extractor Arguments</legend>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <SchemaField
                  onChange={(updatedVal) => {
                    setBaseFhirUrl(updatedVal);
                    props.onChange({ requestHeaders, baseFhirUrl: updatedVal });
                  }}
                  formData={baseFhirUrl}
                  schema={props.schema.properties.baseFhirUrl}
                  uiSchema={props.uiSchema.baseFhirUrl}
                  idSchema={props.idSchema.baseFhirUrl}
                  errorSchema={props.errorSchema.baseFhirUrl}
                  required={props.schema.required?.some((r) => r === 'baseFhirUrl')}
                  registry={props.registry}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <SchemaField
                  onChange={(updatedVal) => {
                    setRequestHeaders(updatedVal);
                    props.onChange({ baseFhirUrl, requestHeaders: updatedVal });
                  }}
                  formData={requestHeaders}
                  schema={props.schema.properties.requestHeaders}
                  uiSchema={props.uiSchema.requestHeaders}
                  idSchema={props.idSchema.requestHeaders}
                  errorSchema={props.errorSchema.registry}
                  required={props.schema.required?.some((r) => r === 'requestHeaders')}
                  registry={props.registry}
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CommonExtractorArgs;
