const fs = require('fs');
const files = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/blog/[slug]/page.tsx',
  'components/Header.tsx',
  'components/PostCard.tsx',
  'components/blog/FeaturedPostCard.tsx',
  'lib/repo/SanityPostRepository.ts',
  'lib/sanity/client.ts',
  'lib/services/BlogService.ts',
  'lib/utils/formatDate.ts'
];
files.forEach(f => {
  const p = 'd:/Coding/BlockP/Mini-Proj-1/project/' + f;
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(//g, '-').replace(/�/g, '-').replace(//g, '>');
  fs.writeFileSync(p, c, 'utf8');
});
console.log('Fixed');
