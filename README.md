## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js](https://nodejs.org/)
- You have installed [Appium](https://appium.io/docs/en/2.0/quickstart/install/)
- You have Android Emulator [Android Studio](https://developer.android.com/studio?gad_source=1&gclid=CjwKCAjwvvmzBhA2EiwAtHVrb91XROcVsMdODGfWmflwABHO3GAB9MCZ4Yavv_fiHUG5EObnEHk_bBoCbjwQAvD_BwE&gclsrc=aw.ds) or as an alterniteve you can use [Vysor](https://www.vysor.io/download/) (In a case you using Vysor , you're should have a real android device)
- You have installed Appium driver [uiautomator2](https://appium.io/docs/en/2.3/ecosystem/drivers/)
- You have [OpenAI](https://platform.openai.com/playground) account

## Installation

To install the app and all necessary packages for this project, follow these steps:

1. **Open your terminal**: This is where you'll enter all the commands listed below.

2. **Clone the repository**: Replace `<your_path>` with the directory where you want to clone the repository. If you want to clone it into the current directory, you can use `.` as the path.

   ```bash
   git clone https://github.com/K1chel/appium-test-behavior-app.git <your_path>
   ```

3. cd `<your_path>`
4. **Run** `npm i`

## Configuration Guide

To configure your application for testing with Appium, follow these steps:

1. **Navigate to the Root of the Application**: Open the terminal and navigate to the root directory of your application.

2. **Open Configuration File**: Navigate to the `config` folder and open the `index.js` file. This file contains important configurations for your Appium tests.

3. **Modify Configuration Options**:

   - **Device Name**: Locate the `capabilities` object and change the `"appium:deviceName"` property to the name of your testing device. To find out your device name, you can run the command `adb devices` in the terminal [More about Android Debug Bridge(adb)](https://developer.android.com/tools/adb), which will list all connected devices. Make sure that in front of your device name, "device" is visible; otherwise, enable developer mode options on your device [Developer options](https://developer.android.com/studio/debug/dev-options). For example:
     ```javascript
     "appium:deviceName": "your_device_name" // emulator-5554 is default is you're using Android SDK
     ```
   - **Application Path**: Follow next steps to correctly configure APK:

   1. Drag and drop ANY app.APK file to app folder located in root of the application.
   2. Navigate to the `config` folder and open the `index.js` file.
   3. Locate the `appPath` variable and update its value to the path of your APK file. For example:
      ```javascript
      const ANDROID_APK = path.resolve() + "/app/your_app.apk";
      ```
   4. Save the changes to the `index.js` file.

4. **Adjust `wdOpts` Configuration**:

   - If you need to run the Appium server on a different port or host, modify the `wdOpts` object accordingly. For instance, to change the port:
     ```javascript
     export const wdOpts = {
       hostname: "localhost", // Change this to your Appium server's hostname if different
       port: 4723, // Change this to your Appium server's port if different
       logLevel: "info", // Adjust log level as needed
       capabilities,
     };
     ```
   - If the default settings are suitable for your setup, you can leave the `wdOpts` configuration as it is.

5. **Set Up Environment Variables**:

- Rename the [`.env.example`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmaximveksler%2FDesktop%2FJavaScript%2Fget-elements-test%2F.env.example%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/maximveksler/Desktop/JavaScript/get-elements-test/.env.example") file to [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmaximveksler%2FDesktop%2FJavaScript%2Fget-elements-test%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/maximveksler/Desktop/JavaScript/get-elements-test/.env") in the root directory of your application. This file will be used to store environment variables.
- Open the [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmaximveksler%2FDesktop%2FJavaScript%2Fget-elements-test%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/maximveksler/Desktop/JavaScript/get-elements-test/.env") file and add your OpenAI secret key to it. For example:
  ```plaintext
  OPENAI_SECRET_KEY=your_openai_secret_key_here
  ```
  Make sure to replace `your_openai_secret_key_here` with your actual OpenAI secret key.
  [More about OpenAI, and key configuration](https://platform.openai.com/docs/quickstart)

By following these steps, you can customize the Appium testing environment to match your device and testing requirements.

## Run the Test

To run your Appium tests, follow these steps carefully:

1. **Ensure Appium Server is Running**: Confirm that your Appium server is up and running, and that it's using the same port as specified in your configuration. To start your Appium server, open a terminal and run the command `appium` or `appium server`. For details on configuring the port, refer to the [configuration section](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmaximveksler%2FDesktop%2FJavaScript%2Fmy-behavior-js%2FREADME.MD%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22configuration-guide%22%7D%5D "Configuration Guide").

2. **Verify Device Emulator is Running**: Make sure that your device emulator is running. This step is crucial for the tests to interact with your application.

3. **Run the Test Command**: Navigate to the directory containing your test file in the terminal. Then, execute the following command to start the test:

   ```bash
   npm run test
   ```

4. **Results**: After test in your terminal you should receive log with all result. It will contain AI analysis, on how app behave when it launched without inernet, and also what happens when interenet connection in enabled.

## Important Info

1. When you start the test for the first time and your app is not installed. It can take a long, depends on APK file size.
2. Check logs in your code editor to understand what happens in this test.
3. At the end of the test you will get all AI analysis in your console
4. Make sure your Appium server is running at the same port as your test config, in config folder.
5. There is a small chance that you get an error while test is running. But in case it happend contact me ASAP, and i'll figure it out as soon as possible.
