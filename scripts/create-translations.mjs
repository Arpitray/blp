import { createClient } from 'next-sanity';

// We need a write token to create items
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Requires Editor/Contributor token
});

// The languages you support in your studio (excluding 'en' which is the base)
const targetLocales = ['fr', 'es', 'de', 'hi', 'zh', 'ar', 'ru', 'it', 'ja', 'ko', 'pt', 'hr', 'nl'];

async function createTranslations() {
  const originalSlug = process.argv[2];
  if (!originalSlug) {
    console.error("❌ Please provide the slug of the post to translate.\nUsage: node --env-file=.env.local scripts/create-translations.mjs <post-slug>");
    process.exit(1);
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌ Error: Missing SANITY_API_TOKEN in .env.local file.\nGo to sanity.io/manage -> API -> Tokens -> Add New Token (Editor rights) -> copy and paste it into .env.local as SANITY_API_TOKEN=your_token_here");
    process.exit(1);
  }

  console.log(`🔍 Searching for post with slug: '${originalSlug}'...`);

  // Fetch the original post
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug: originalSlug });

  if (!post) {
    console.error(`❌ Post with slug '${originalSlug}' not found.`);
    process.exit(1);
  }

  console.log(`✅ Found post: "${post.title}". Generating translated drafts...`);

  // Separate system fields that shouldn't be copied directly
  const { _id, _createdAt, _updatedAt, _rev, ...postData } = post;

  let successCount = 0;

  for (const lang of targetLocales) {
    // Generate a unique ID for the new draft and a localized slug
    const newId = `drafts.translation-${_id}-${lang}`;
    const newSlug = postData.slug.current;

    const newPost = {
      ...postData,
      _id: newId,
      language: lang,
      slug: {
        _type: 'slug',
        current: newSlug,
      },
      // Append a clear tag to the title so it stands out in Sanity Studio
      title: `[${lang.toUpperCase()}] ${postData.title}`,
    };

    try {
      await client.createIfNotExists(newPost);
      console.log(`   ➕ Created Draft for ${lang.toUpperCase()}: ${newSlug}`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Failed to create draft for ${lang}:`, err.message);
    }
  }

  console.log(`\n🎉 Done! Created ${successCount} translated drafts.`);
  console.log("👉 Open your Sanity Studio. You will see these items clearly marked as Drafts with their language prefix.");
  console.log("👉 All you have to do now is go in, translate the body/title, and hit Publish!");
}

createTranslations();
