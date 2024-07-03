import { exec } from "child_process";

export async function logState(driver, message) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${message}`);
}

export async function clearLogcatLogs() {
  return new Promise((resolve, reject) => {
    exec("adb logcat -c", (error, stdout, stderr) => {
      if (error) {
        reject(`Error in clean logcat: ${error.message}`);
      } else if (stderr) {
        reject(`Stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

export async function getLogcatLogs() {
  return new Promise((resolve, reject) => {
    exec("adb logcat -d", (error, stdout, stderr) => {
      if (error) {
        reject(`Error in get logcat: ${error.message}`);
      } else if (stderr) {
        reject(`Stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

export function removeSpacesAndSpecialCharacters(logs) {
  const relevantLines = logs
    .split("\n")
    .filter(
      (line) =>
        line.includes("internet") ||
        line.includes("enabled") ||
        line.includes("disabled") ||
        line.includes("connected") ||
        line.includes("disconnected") ||
        line.includes("network") ||
        line.includes("mobile") ||
        line.includes("wifi") ||
        line.includes("airplane") ||
        line.includes("mode")
    )
    .join(" ");

  return relevantLines.replace(/[^a-zA-Z0-9]/g, "");
}
