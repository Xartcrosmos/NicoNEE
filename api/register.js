let pendingRequests = [];

// Service Role key stored in Vercel environment variable
const SERVICE_KEY = process.env.SERVICE_KEY;

export default function handler(req, res) {
  if (req.method === "POST") {
    // Server-side only, browser does not send key
    const { name, number } = req.body;
    if (!name || !number) {
      return res.status(400).json({ status: "Missing name or number" });
    }

    pendingRequests.push({ name, number, timestamp: Date.now() });
    return res.status(200).json({ status: "received" });

  } else if (req.method === "GET") {
    // ESP32 polls here → no key required
    res.status(200).json(pendingRequests);
    pendingRequests = [];
  } else {
    res.status(405).end();
  }
}
