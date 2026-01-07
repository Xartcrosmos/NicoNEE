let pendingRequests = [];

export default function handler(req, res) {
  if (req.method === "POST") {
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
