const { SitemapStream, streamToPromise } = require('../../rockbride/node_modules/sitemap-generator/src/index');
const fs = require('fs');

// Define your website's base URL
const BASE_URL = 'https://rockbridestudio.com';

// List your website's URLs
const urls = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/photography', changefreq: 'monthly', priority: 0.8 }
];

// Create a sitemap stream
const sitemap = new SitemapStream({ hostname: BASE_URL });

(async () => {
  try {
    // Add each URL to the sitemap
    urls.forEach((url) => sitemap.write(url));

    // End the sitemap stream
    sitemap.end();

    // Convert the stream to a string and save it as a file
    const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());
    fs.writeFileSync('sitemap.xml', sitemapXML);

    console.log('Sitemap generated successfully!');
  } catch (err) {
    console.error('Error generating sitemap:', err);
  }
})();
