// Temporary in-memory storage for pending requests
let pendingRequests = [];

// Service Role Key for authorization (stored in Vercel env)
const SERVICE_KEY = process.env.SERVICE_KEY;

export default function handler(req, res) {
  if (req.method === "POST") {
    const authHeader = req.headers.authorization || "";

    if (authHeader !== `Bearer ${SERVICE_KEY}`) {
      return res.status(401).json({ status: "Unauthorized" });
    }

    const { name, number } = req.body;
    if (!name || !number) {
      return res.status(400).json({ status: "Missing name or number" });
    }

    pendingRequests.push({ name, number, timestamp: Date.now() });
    return res.status(200).json({ status: "received" });

  } else if (req.method === "GET") {
    // ESP32 polls here → no auth required
    res.status(200).json(pendingRequests);
    pendingRequests = []; // clear after sending

  } else {
    res.status(405).end();
  }
}
