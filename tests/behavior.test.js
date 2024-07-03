import { remote } from "webdriverio";

import { capabilities, wdOpts } from "../config/index.js";
import { analyzeLogs } from "../lib/analyzeLogs.js";
import {
  clearLogcatLogs,
  getLogcatLogs,
  logState,
  removeSpacesAndSpecialCharacters,
} from "../lib/utils.js";

async function runTest() {
  const driver = await remote({ ...wdOpts }, { capabilities });
  console.log("Driver initialized.");

  await driver.pause(3000);

  const packageName = await driver.getCurrentPackage();
  await driver.setNetworkConnection(1);
  await clearLogcatLogs();
  await driver.activateApp(packageName);
  console.log("App activated.");
  try {
    // ALL ACTIONS WITH INTERNET DISABLED
    await driver.setNetworkConnection(1);
    await logState(driver, "Internet connection disabled.");

    await logState(driver, "Starting test with internet connection disabled.");

    await driver.pause(3000);

    // ALL ACTIONS WITH INTERNET ENABLED
    await driver.setNetworkConnection(6);
    await logState(driver, "Internet connection re-enabled.");
    await driver.pause(5000);

    await logState(driver, "Starting test with internet connection enabled.");

    // GET LOGS
    const logs = await getLogcatLogs();
    const clearLogs = removeSpacesAndSpecialCharacters(logs);

    // ANALYZE LOGS
    await analyzeLogs(clearLogs);

    // FINISH TEST
    await logState(driver, "Test completed successfully.");
  } catch (error) {
    await logState(driver, `Test failed: ${error}`);
  } finally {
    await driver.deleteSession();
  }
}

runTest();
