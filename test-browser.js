const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        await page.goto('http://localhost:3000/en/premium', { waitUntil: 'networkidle2' });
        
        // Wait for rive to load
        await new Promise(r => setTimeout(r, 2000));
        
        const debugInfo = await page.evaluate(() => {
            const el = document.getElementById('rive-debug-info');
            return el ? el.textContent : 'No debug info found';
        });
        
        console.log('--- RIVE DOM INFO ---');
        console.log(debugInfo);
        console.log('---------------------');
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
