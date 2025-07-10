// pages/api/threats.js
import Parser from 'rss-parser';

const parser = new Parser();
const sources = [
  'https://alerts.weather.gov/cap/us.php?x=0', // NOAA alerts
  'https://www.dhs.gov/feeds/alerts.xml',       // DHS alerts (example)
];

export default async function handler(req, res) {
  try {
    const allItems = [];

    for (const url of sources) {
      const feed = await parser.parseURL(url);
      allItems.push(...(feed.items || []));
    }

    res.status(200).json({ items: allItems.slice(0, 20) });
  } catch (error) {
    console.error('RSS fetch failed:', error);
    res.status(500).json({ items: [] });
  }
}
