// pages/api/threats.js
import Parser from 'rss-parser';

const parser = new Parser();
const GDELT_URL = 'https://api.gdeltproject.org/api/v2/doc/doc?query=terror+OR+emergency+OR+evacuation+OR+cyberattack+OR+protest+OR+riot&mode=ArtList&format=json';

const RSS_FEEDS = [
  'https://www.fema.gov/rss/updates.xml',
  'https://www.dhs.gov/ntas/all.xml',
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.atom',
  'https://alerts.weather.gov/cap/us.php?x=0',
  'https://stratrisks.com/feed'
];

async function fetchRSSItems() {
  const allItems = await Promise.all(
    RSS_FEEDS.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);
        return feed.items.slice(0, 5); // Get top 5 per feed
      } catch (e) {
        console.error(`Error fetching RSS: ${url}`, e);
        return [];
      }
    })
  );
  return allItems.flat();
}

async function fetchGdeltItems() {
  try {
    const res = await fetch(GDELT_URL);
    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.error('GDELT fetch failed:', err);
    return [];
  }
}

export default async function handler(req, res) {
  const [rssItems, gdeltItems] = await Promise.all([
    fetchRSSItems(),
    fetchGdeltItems()
  ]);

  res.status(200).json({
    rss: rssItems,
    gdelt: gdeltItems
  });
}
