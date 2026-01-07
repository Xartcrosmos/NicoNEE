let pendingRequests = []; // temporary storage

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, number } = req.body;
    pendingRequests.push({ name, number, timestamp: Date.now() });
    res.status(200).json({ status: "received" });
  } else if (req.method === "GET") {
    // ESP32 polls here
    res.status(200).json(pendingRequests);
    pendingRequests = []; // clear after sending
  } else {
    res.status(405).end();
  }
}
