
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function check() {
  const query = `
    array::unique(
      *[_type == "postMetadata" && defined(slug.current) && isHidden != true].slug.current +
      *[_type == "post" && defined(slug.current)].slug.current
    ) { "slug": @ }
  `;
  try {
    const data = await client.fetch(query);
    console.log('Result:', JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }
}

check();
