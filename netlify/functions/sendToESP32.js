// sendToESP32.js (ESM, no node-fetch needed)
export async function handler(event, context) {
  try {
    const { name, number } = JSON.parse(event.body);

    // Use your ESP32 URL here (can be public URL or local for testing)
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
