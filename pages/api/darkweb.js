import axios from 'axios';

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const response = await axios.get(`https://leakcheck.io/api`, {
      params: {
        key: process.env.LEAKCHECK_API_KEY,
        check: email,
        type: 'email',
      }
    });

    if (response.data.success === false) {
      return res.status(500).json({ error: response.data.message || 'API error.' });
    }

    const breaches = response.data.result || [];

    res.status(200).json({ breaches });
  } catch (error) {
    console.error('LeakCheck API error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
