const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body); // { name, number }
  const ESP32_IP = "192.168.43.249"; // hardcoded ESP32 IP (later can fetch from DB)

  try {
    const res = await fetch(`http://${ESP32_IP}/receive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "OK", espResponse: data })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ status: "FAIL", error: err.message }) };
  }
};
