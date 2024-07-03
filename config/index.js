import path from "path";

const ANDROID_APK =
  path.resolve() + "/app/The Survival Hunter Games 2_1.189_APKPure.apk";

export const capabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554", // TODO: You should change to your device name
  "appium:app": ANDROID_APK,
};

export const wdOpts = {
  hostname: "localhost",
  port: 4723, // default for Appium, but you can change it depend on your appium server
  logLevel: "info",
  capabilities,
};
