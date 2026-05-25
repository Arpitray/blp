const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const dirs = [
    path.join(__dirname, 'components'),
    path.join(__dirname, 'app')
];

let files = [];
dirs.forEach(dir => {
    if (fs.existsSync(dir)) files = files.concat(walk(dir));
});

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We specifically want to target tags with max-w-site
    // regex to match: className="... max-w-site ... px-6 lg:px-16 ..."
    
    // Simplest is to replace "px-6 lg:px-16" with "px-[12px] lg:px-[40px]" globally if max-w-site is in the same line
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('max-w-site')) {
            lines[i] = lines[i].replace('px-6 lg:px-16', 'px-[12px] lg:px-[40px]');
            lines[i] = lines[i].replace('px-[24px] lg:px-[40px]', 'px-[12px] lg:px-[40px]');
            // Some just have px-6
            // "px-6 w-full max-w-site"
            lines[i] = lines[i].replace('px-6 w-full max-w-site', 'px-[12px] lg:px-[40px] w-full max-w-site');
        }
    }
    
    content = lines.join('\n');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log('Updated:', file);
    }
});

console.log('Total files updated:', updatedCount);
