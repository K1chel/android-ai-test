import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function analyzeLogs(logs) {
  const apiKey = process.env.OPENAI_SECRET_KEY;

  if (!apiKey) {
    console.error("OpenAI API key is not set. Please check your .env file.");
    return;
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a QA Anroid enginner working on an Android app. You should analyze only the relevant logs and provide a summary of the logs.",
          },
          {
            role: "user",
            content: `Summarize the following logs: ${logs}. Focus only on the behavior when we laucnh the app without internet , and after analyze what happend when interent is back . Ignore logs related to Bluetooth devices, Wi-Fi state changes, or other smartphone/device behavior not related to the app. Provide a summary of the app's behavior based on these logs.`,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const analysis = response.data.choices[0].message.content;
    console.log(`Log analysis: ${analysis}`);
  } catch (err) {
    console.error(`Error during log analysis: ${err}`);
    if (err.response) {
      console.error(`Response status: ${err.response.status}`);
      console.error(
        `Response data: ${JSON.stringify(err.response.data, null, 2)}`
      );
    }
  }
}
