export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/connectivity_test`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        source: "vercel",
        value: "hello"
      })
    }
  );

  res.status(response.ok ? 200 : 500).end();
}
