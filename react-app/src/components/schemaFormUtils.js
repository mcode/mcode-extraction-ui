import React, { useState } from 'react';
import FilePicker from './FilePicker';
import ExtractorArray from './ExtractorArray';

function getConfigSchema() {
  return window.api.getConfigSchema();
}

const uiSchema = {
  patientIdCsvPath: {
    'ui:label': false,
    'ui:widget': 'file',
    classNames: '',
  },
  commonExtractorArgs: {
    classNames: '',
    baseFhirUrl: {
      classNames: 'input-width-limit',
    },
    requestHeaders: {
      classNames: 'input-width-limit',
    },
  },
  notificationInfo: {
    classNames: '',
    host: {
      classNames: 'input-width-limit',
    },
    port: {
      classNames: 'input-width-limit',
    },
    from: {
      classNames: 'input-width-limit',
    },
    to: {
      classNames: 'input-width-limit',
    },
    tlsRejectUnauthorized: {
      classNames: '',
    },
  },
  extractors: {
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
    setPath('No File Selected');
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
  ArrayField: ExtractorArray,
};

export { getConfigSchema, uiSchema, widgets, fields };
