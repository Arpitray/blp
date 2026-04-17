
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'pl6zt5cf',
  dataset: 'test',
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function check() {
  const slug = 'does-watching-porn-affect-your-confidence';
  const lang = 'en';
  // Note: Exactly the same query as in queries.ts
  const query = `*[_type == "post" && metadata->slug.current == $slug && ($lang == "" || language == $lang)][0]{
    _id,
    title,
    language,
    "metadataSlug": metadata->slug.current,
    "metadataRef": metadata._ref
  }`;
  const data = await client.fetch(query, { slug, lang });
  console.log('Result without token:');
  console.log(JSON.stringify(data, null, 2));
}

check();
