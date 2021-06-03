// The code below is a copy of cli.js from mcode-extraction-framework

const { MCODEClient } = require('../node_modules/mcode-extraction-framework/src/client/MCODEClient');
const logger = require('../node_modules/mcode-extraction-framework/src/helpers/logger');
const { mcodeApp } = require('../node_modules/mcode-extraction-framework/src/cli/app');


async function runExtraction(fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) {
    try {
        if (fromDate.length < 1) {
            fromDate = undefined;
        }
        if (toDate.length < 1) {
            toDate = undefined;
        }
        if(!debug) {
            debug = undefined;
        }
        debug = true; // DELETE ME
        await mcodeApp(MCODEClient, fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries);
    } catch (e) {
        if (debug) logger.level = 'debug';
        logger.error(e.message);
        logger.debug(e.stack);
        process.exit(1);
    }
}

module.exports = runExtraction;
