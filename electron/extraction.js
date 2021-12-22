const { isAbsolute } = require('path');
const { getConfig, logger, mcodeApp, MCODEClient } = require('mcode-extraction-framework');

async function runExtraction(fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) {
  try {
    let defaultFromDate = fromDate;
    let defaultToDate = toDate;
    let defaultDebug = debug;
    if (fromDate.length < 1) {
      defaultFromDate = undefined;
    }
    if (toDate.length < 1) {
      defaultToDate = undefined;
    }
    if (!debug) {
      defaultDebug = undefined;
    }
    const config = getConfig(configFilepath);
    if ('patientIdCsvPath' in config && !isAbsolute(config.patientIdCsvPath)) {
      throw new Error("Patient ID CSV path must not be a relative path.");
    }
    if ('extractors' in config) {
      config.extractors.forEach((extractor) => {
        if ('constructorArgs' in extractor && 'filePath' in extractor.constructorArgs) {
          if (!isAbsolute(extractor.constructorArgs.filePath)) {
            throw new Error("Extractor file paths must not be relative paths.");
          }
        }
      })
    }
    const extractedData = await mcodeApp(
      MCODEClient,
      defaultFromDate,
      defaultToDate,
      config,
      runLogFilepath,
      defaultDebug,
      allEntries,
    );

    if (!extractedData) {
      return null;
    }
    return extractedData;
  } catch (e) {
    if (debug) logger.level = 'debug';
    logger.error(e.message);
    logger.debug(e.stack);
    return null;
  }
}

module.exports = runExtraction;
