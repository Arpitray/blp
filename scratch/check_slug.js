const { createClient } = require('next-sanity');

const client = createClient({
  projectId: "pl6zt5cf",
  dataset: "test",
  apiVersion: "2023-04-06",
  useCdn: false,
});

async function run() {
  const slug = "blog-15";
  const lang = "en";
  const query = `*[_type == "post" && (metadata->slug.current == $slug || slug.current == $slug) && ($lang == "" || language == $lang)][0] { 
    title, 
    "slug": coalesce(metadata->slug.current, slug.current),
    language 
  }`;
  
  const post = await client.fetch(query, { slug, lang });
  console.log("Post found:", post);

  const allPostsWithSlugs = await client.fetch(`*[_type == "post"] { 
    title, 
    "slug": coalesce(metadata->slug.current, slug.current),
    language 
  }`);
  console.log("All slugs:", allPostsWithSlugs.map(p => p.slug));
}

run();
