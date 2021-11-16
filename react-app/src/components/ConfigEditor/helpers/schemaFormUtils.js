import React, { useState } from 'react';
import FilePicker from '../../CommonComponents/FilePicker';
import ExtractorAccordion from '../ExtractorAccordion';
import NotificationInfoAccordion from '../NotificationInfoAccordion';
import CommonExtractorArgsAccordion from '../CommonExtractorArgsAccordion';

function getConfigSchema() {
  return window.api.getConfigSchema();
}

const uiSchema = {
  'ui:order': ['patientIdCsvPath', 'extractors', '*'],
  patientIdCsvPath: {
    'ui:label': false,
    'ui:widget': 'file',
    classNames: 'form-label-header-text',
  },
  commonExtractorArgs: {
    'ui:field': 'commonExtractorArgs',
    'ui:label': 'Optional Configuration Fields',
    classNames: 'form-label-header-text',
    baseFhirUrl: {
      classNames: 'input-width-limit',
      'ui:placeholder': 'http://',
    },
    requestHeaders: {
      classNames: 'additional-properties-width input-array-label',
    },
  },
  notificationInfo: {
    'ui:field': 'notificationInfoAccordion',
    classNames: '',
    host: {},
    port: {},
    from: {},
    to: {
      classNames: 'input-array-label',
    },
    tlsRejectUnauthorized: {
      classNames: '',
    },
  },
  extractors: {
    'ui:field': 'extractorArray',
    extractor: {
      classNames: '',
      label: {
        classNames: 'input-width-limit',
      },
      type: {
        classNames: '',
      },
      constructorArgs: {
        classNames: '',
        filePath: {
          classNames: '',
        },
        url: {
          classNames: 'input-width-limit',
        },
        clinicalSiteID: {
          classNames: 'input-width-limit',
        },
        clinicalSiteSystem: {
          classNames: 'input-width-limit',
        },
        type: {
          classNames: '',
        },
        mask: {
          classNames: '',
        },
      },
    },
  },
};

function FileWidget(props) {
  let startingPath = 'No File Selected';
  if (props.value) {
    startingPath = props.value;
  }
  const [path, setPath] = useState(startingPath);

  function setFilePath(newPath) {
    setPath(newPath);
    props.onChange(newPath);
  }

  function onClear() {
    setPath('No File Chosen');
    props.onChange('No File Chosen');
  }
  function getFile() {
    window.api.getFile(['csv']).then((promise) => {
      if (promise.filePaths[0] !== undefined) {
        setPath(promise.filePaths[0]);
        props.onChange(promise.filePaths[0]);
      }
    });
  }
  return (
    <FilePicker
      buttonText="Select File"
      controlId={props.label}
      onClick={getFile}
      setFilePath={setFilePath}
      filePath={path}
      label={props.label}
      onClear={onClear}
      required={props.required}
    />
  );
}

const widgets = {
  FileWidget,
};

const fields = {
  extractorArray: ExtractorAccordion,
  notificationInfoAccordion: NotificationInfoAccordion,
  commonExtractorArgs: CommonExtractorArgsAccordion,
};

export { getConfigSchema, uiSchema, widgets, fields };
