function getConfigSchema() {
  return window.api.getConfigSchema();
}

const uiSchema = {
  'patientIdCsvPath': {
    "classNames": "page-text"
  },
  'commonExtractorArgs': {
    "classNames": "page-text",
    'baseFhirUrl': {
      "classNames": "page-text"
    },
    'requestHeaders': {
      "classNames": "page-text"
    },
  },
  'notificationInfo': {
    "classNames": "page-text",
    'host': {
      "classNames": "page-text"
    },
    'port': {
      "classNames": "page-text"
    },
    'from': {
      "classNames": "page-text"
    },
    'to': {
      "classNames": "page-text"
    },
    'tlsRejectUnauthorized': {
      "classNames": "page-text"
    },
  },
  'extractors': {
    'extractor': {
      "classNames": "page-text",
      'label': {
        "classNames": "page-text"
      },
      'type': {
        "classNames": "page-text"
      },
      'constructorArgs': {
        "classNames": "page-text",
        'filePath': {
          "classNames": "page-text"
        },
        "url": {
          "classNames": "page-text"
        },
        "clinicalSiteID": {
          "classNames": "page-text"
        },
        "clinicalSiteSystem": {
          "classNames": "page-text"
        },
        "type": {
          "classNames": "page-text"
        },
        "mask": {
          "classNames": "page-text"
        },
      },
    },
  },
};

const widgets = {

}

const fields = {

}

module.exports = { getConfigSchema, uiSchema, widgets, fields };
