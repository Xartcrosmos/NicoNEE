// sendToESP32.js
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    // Parse the incoming JSON from the web form
    const { name, number } = JSON.parse(event.body);

    // Replace with your ESP32 public URL or local IP for testing
    const ESP32_URL = process.env.ESP32_URL; 

    const response = await fetch(`${ESP32_URL}/receive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number })
    });

    const espData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "OK",
        sentToESP32: espData
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        errorType: err.name,
        errorMessage: err.message
      })
    };
  }
}
