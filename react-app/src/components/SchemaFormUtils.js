function getConfigSchema() {
  return window.api.getConfigSchema();
}

const uiSchema = {
  patientIdCsvPath: {
    'ui:title': {
      'classNames': 'page-text',
    },
  },
  commonExtractorArgs: {
    'ui:title': {
      'classNames': 'page-text',
    },
    baseFhirUrl: {
      'ui:title': {
        'classNames': 'page-text',
      },
    },
    requestHeaders: {
      'ui:title': {
        'classNames': 'page-text',
      },
    },
  },
  notificationInfo: {
    'ui:title': {
      'classNames': 'page-text',
    },
    host: {
      'ui:title': {
        'classNames': 'page-text',
      },
    },
    port: {
      'ui:title': {
        'classNames': 'page-text',
      },
    },
    from: {
      'ui:title': {
        'classNames': 'page-text',
      },
    },
    to: {
      'ui:title': {
        'classNames': 'page-text',
      },
    },
    tlsRejectUnauthorized: {
      'ui:title': {
        'classNames': 'page-text',
      },
    },
  },
  extractors: {
    extractor: {
      'ui:title': {
        'classNames': 'page-text',
      },
      label: {
        'ui:title': {
          'classNames': 'page-text',
        },
      },
      type: {
        'ui:title': {
          'classNames': 'page-text',
        },
      },
      constructorArgs: {
        'ui:title': {
          'classNames': 'page-text',
        },
        filePath: {
          'ui:title': {
            'classNames': 'page-text',
          },
        },
        url: {
          'ui:title': {
            'classNames': 'page-text',
          },
        },
        clinicalSiteID: {
          'ui:title': {
            'classNames': 'page-text',
          },
        },
        clinicalSiteSystem: {
          'ui:title': {
            'classNames': 'page-text',
          },
        },
        type: {
          'ui:title': {
            'classNames': 'page-text',
          },
        },
        mask: {
          'ui:title': {
            'classNames': 'page-text',
          },
        },
      },
    },
  },
};

module.exports = { getConfigSchema, uiSchema };
