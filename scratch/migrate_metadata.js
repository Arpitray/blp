
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrate() {
  console.log('Starting migration...');
  
  // 1. Fetch all posts with slugs
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]`);
  
  // 2. Group by slug
  const groups = {};
  posts.forEach(post => {
    const slug = post.slug.current;
    if (!groups[slug]) groups[slug] = [];
    groups[slug].push(post);
  });
  
  for (const slug in groups) {
    console.log(`Processing slug: ${slug}`);
    const versions = groups[slug];
    
    // Pick a source for metadata (prefer EN)
    const source = versions.find(v => v.language === 'en') || versions[0];
    
    // Create postMetadata
    const metadataDoc = {
      _type: 'postMetadata',
      title: source.title,
      slug: { _type: 'slug', current: slug },
      mainImage: source.mainImage,
      categories: source.categories,
      author: source.author,
      reviewer: source.reviewer,
      publishedAt: source.publishedAt,
      isFeatured: source.isFeatured || false,
      isHidden: false
    };
    
    try {
      const createdMetadata = await client.create(metadataDoc);
      console.log(`Created postMetadata for ${slug}: ${createdMetadata._id}`);
      
      // Update each post version
      for (const post of versions) {
        await client
          .patch(post._id)
          .set({ metadata: { _type: 'reference', _ref: createdMetadata._id } })
          // .unset(['slug', 'mainImage', 'categories', 'author', 'reviewer', 'publishedAt', 'isFeatured'])
          .commit();
        console.log(`Linked post ${post._id} to metadata`);
      }
    } catch (err) {
      console.error(`Error processing ${slug}:`, err.message);
    }
  }
  
  console.log('Migration finished!');
}

migrate();
