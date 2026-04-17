const { createClient } = require('next-sanity');

const client = createClient({
  projectId: "pl6zt5cf",
  dataset: "test",
  apiVersion: "2023-04-06",
  useCdn: false,
});

async function run() {
  const posts = await client.fetch(`*[_type == "post"] { category, categories, "categoriesRef": categories[]->{title} }`);
  console.log("Posts schemas:", JSON.stringify(posts, null, 2));

  const uniqueCats = await client.fetch(`array::unique(*[_type == "post" && defined(category)].category)`);
  console.log("Unique String Categories:", uniqueCats);
  
  const uniqueCatsRef = await client.fetch(`array::unique(*[_type == "post" && defined(categories)].categories[]->title)`);
  console.log("Unique Ref Categories:", uniqueCatsRef);
}

run();
