const { logger, mcodeApp, MCODEClient } = require('mcode-extraction-framework');

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
    const extractedData = await mcodeApp(
      MCODEClient,
      defaultFromDate,
      defaultToDate,
      configFilepath,
      runLogFilepath,
      defaultDebug,
      allEntries,
    ).then((value) => value);
    return extractedData;
  } catch (e) {
    if (debug) logger.level = 'debug';
    logger.error(e.message);
    logger.debug(e.stack);
  }
  return undefined;
}

module.exports = runExtraction;
