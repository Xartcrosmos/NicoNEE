export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'POST only'});
  
  const {device, name, contact, fingerID} = req.body;
  
  const response = await fetch('https://qkswuqrgtbfcdywzuxtk.supabase.co/rest/v1/registrations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      device, name, contact, fingerID, 
      status: 'pending',
      updated_at: new Date().toISOString()
    })
  });
  
  res.json(await response.json());
}
