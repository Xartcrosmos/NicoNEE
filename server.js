import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/api/register", async (req, res) => {
  const { name, number } = req.body;

  try {
    // Send to ESP32
    const espRes = await fetch(process.env.ESP32_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number })
    });
    const espData = await espRes.json();

    // Send to Supabase
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_KEY}`
      },
      body: JSON.stringify({ name, number, status: espData.status })
    });

    res.json({ status: "sent to ESP32 and saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "failed", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
