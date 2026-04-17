
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function check() {
  const slug = 'does-watching-porn-affect-your-confidence';
  const lang = 'en';
  const query = `*[_type == "post" && metadata->slug.current == $slug && ($lang == "" || language == $lang)][0]{
    _id,
    title,
    language,
    "metadataSlug": metadata->slug.current,
    "metadataRef": metadata._ref
  }`;
  const data = await client.fetch(query, { slug, lang });
  console.log(JSON.stringify(data, null, 2));
}

check();
