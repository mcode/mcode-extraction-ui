// The code below is a copy of cli.js from mcode-extraction-framework

const { MCODEClient } = require('../node_modules/mcode-extraction-framework/src/client/MCODEClient');
const logger = require('../node_modules/mcode-extraction-framework/src/helpers/logger');
const { mcodeApp } = require('../node_modules/mcode-extraction-framework/src/cli/app');


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
        if(!debug) {
            defaultDebug = undefined;
        }
        const extractedData = await mcodeApp(MCODEClient, defaultFromDate, defaultToDate, configFilepath, runLogFilepath, defaultDebug, allEntries).then((value) =>  value);
        return extractedData;

    } catch (e) {
        if (debug) logger.level = 'debug';
        logger.error(e.message);
        logger.debug(e.stack);
        process.exit(1);
    }
    return undefined;
}

module.exports = runExtraction;
