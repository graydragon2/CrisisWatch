export default async function handler(req, res) {
  const { email } = req.query;
  const apiKey = process.env.LEAKCHECK_API_KEY;

  if (!email || !apiKey) {
    return res.status(400).json({ error: 'Missing email or API key.' });
  }

  try {
    const response = await fetch(
      `https://leakcheck.io/api?key=${apiKey}&check=email&value=${encodeURIComponent(email)}`
    );
    const data = await response.json();

    if (!data.found) {
      return res.status(200).json({ found: false, message: 'No leaks found.' });
    }

    res.status(200).json({ found: true, results: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
}
