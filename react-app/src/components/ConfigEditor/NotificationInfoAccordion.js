import React, { useState } from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';

function NotificationInfoAccordion(props) {
  const [host, setHost] = useState(props.formData?.host || null);
  const [port, setPort] = useState(props.formData?.port || null);
  const [to, setTo] = useState(props.formData?.to || []);
  const [from, setFrom] = useState(props.formData?.from || null);
  const [tlsRejectUnauthorized, setTlsRejectUnauthorized] = useState(props.formData?.tlsRejectUnauthorized || false);

  const { SchemaField } = props.registry.fields;

  return (
    <div className="config-section-accordion">
      {props.uiSchema['ui:label'] && <label>{props.uiSchema['ui:label']}</label>}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <legend>Notification Information</legend>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <SchemaField
                  onChange={(updatedVal) => {
                    setHost(updatedVal);
                    props.onChange({ port, to, from, tlsRejectUnauthorized, host: updatedVal });
                  }}
                  formData={host}
                  schema={props.schema.properties.host}
                  uiSchema={props.uiSchema.host}
                  idSchema={props.idSchema.host}
                  errorSchema={props.errorSchema.host}
                  required={props.schema.required?.some((r) => r === 'host')}
                  registry={props.registry}
                />
              </Col>
              <Col>
                <SchemaField
                  onChange={(updatedVal) => {
                    setPort(updatedVal);
                    props.onChange({ host, to, from, tlsRejectUnauthorized, port: updatedVal });
                  }}
                  formData={port}
                  schema={props.schema.properties.port}
                  uiSchema={props.uiSchema.port}
                  idSchema={props.idSchema.port}
                  errorSchema={props.errorSchema.port}
                  required={props.schema.required?.some((r) => r === 'port')}
                  registry={props.registry}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <SchemaField
                  onChange={(updatedVal) => {
                    setTo(updatedVal);
                    props.onChange({ host, port, from, tlsRejectUnauthorized, to: updatedVal });
                  }}
                  formData={to}
                  schema={props.schema.properties.to}
                  uiSchema={props.uiSchema.to}
                  idSchema={props.idSchema.to}
                  errorSchema={props.errorSchema.to}
                  required={props.schema.required?.some((r) => r === 'to')}
                  registry={props.registry}
                />
              </Col>
              <Col>
                <SchemaField
                  onChange={(updatedVal) => {
                    setFrom(updatedVal);
                    props.onChange({ host, port, to, tlsRejectUnauthorized, from: updatedVal });
                  }}
                  formData={from}
                  schema={props.schema.properties.from}
                  uiSchema={props.uiSchema.from}
                  idSchema={props.idSchema.from}
                  errorSchema={props.errorSchema.from}
                  required={props.schema.required?.some((r) => r === 'from')}
                  registry={props.registry}
                />
              </Col>
            </Row>
            <Row>
              <SchemaField
                onChange={(updatedVal) => {
                  setTlsRejectUnauthorized(updatedVal);
                  props.onChange({ host, port, to, from, tlsRejectUnauthorized: updatedVal });
                }}
                formData={tlsRejectUnauthorized}
                schema={props.schema.properties.tlsRejectUnauthorized}
                uiSchema={props.uiSchema.tlsRejectUnauthorized}
                idSchema={props.idSchema.tlsRejectUnauthorized}
                errorSchema={props.errorSchema.tlsRejectUnauthorized}
                required={props.schema.required?.some((r) => r === 'tlsRejectUnauthorized')}
                registry={props.registry}
              />
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default NotificationInfoAccordion;
