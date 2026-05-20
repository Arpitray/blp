const fs = require('fs');
const rive = require('@rive-app/canvas');

const buf = fs.readFileSync('public/websitepremium.riv');

rive.load({
    canvas: null,
}).then((r) => {
    // We don't have a canvas, so we might just use the low-level API
    console.log('Rive loaded in Node?');
}).catch(e => {
    console.log('Error:', e);
});
