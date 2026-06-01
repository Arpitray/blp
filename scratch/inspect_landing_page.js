const fs = require('fs');
const buf = fs.readFileSync('public/landing/landing_page_.riv');

function readVarUint(buf, offset) {
    let result = 0, shift = 0, i = 0;
    while (offset + i < buf.length) {
        const b = buf[offset + i];
        result |= (b & 0x7f) << shift;
        i++;
        if (!(b & 0x80)) break;
        shift += 7;
    }
    return { value: result, length: i };
}

function readString(buf, offset) {
    const len = readVarUint(buf, offset);
    return { str: buf.slice(offset + len.length, offset + len.length + len.value).toString('utf8'), length: len.length + len.value };
}

const animations = [];
let offset = 0;

while (offset < buf.length - 10) {
    if (buf[offset] === 0x1f) {
        let p = offset + 1;
        let name = null, fps = null, duration = null, loopType = null;
        let maxRead = 40;
        
        while (p < offset + maxRead && p < buf.length) {
            const propKey = buf[p];
            if (propKey === 0x00) break;
            p++;
            
            if (propKey === 0x37) { // name
                try {
                    const res = readString(buf, p);
                    if (/^[a-zA-Z]/.test(res.str) && res.str.length < 50) {
                        name = res.str;
                        p += res.length;
                    } else { p -= 1; break; }
                } catch { break; }
            } else if (propKey === 0x38) { // fps
                try {
                    const res = readVarUint(buf, p);
                    fps = res.value;
                    p += res.length;
                } catch { break; }
            } else if (propKey === 0x39) { // duration
                try {
                    const res = readVarUint(buf, p);
                    duration = res.value;
                    p += res.length;
                } catch { break; }
            } else if (propKey === 0x3b) { // loop type
                try {
                    const res = readVarUint(buf, p);
                    loopType = res.value;
                    p += res.length;
                } catch { break; }
            } else {
                break;
            }
        }
        
        if (name) {
            const loopLabel = loopType === 0 ? 'one-shot' : loopType === 1 ? 'LOOP' : loopType === 2 ? 'pingpong' : `type${loopType}`;
            const durationSec = (fps && duration) ? (duration / fps).toFixed(2) + 's' : '?';
            animations.push({ name, fps, duration, loopType, loopLabel, durationSec });
        }
    }
    offset++;
}

const seen = new Set();
const unique = animations.filter(a => {
    if (seen.has(a.name)) return false;
    seen.add(a.name);
    return true;
}).sort((a, b) => a.name.localeCompare(b.name));

console.log('=== All LinearAnimations in landing_page_.riv ===\n');
console.log(`${'Name'.padEnd(35)} ${'FPS'.padEnd(5)} ${'Frames'.padEnd(8)} ${'Duration'.padEnd(10)} Loop`);
console.log('-'.repeat(70));
unique.forEach(a => {
    const row = `${a.name.padEnd(35)} ${String(a.fps ?? '?').padEnd(5)} ${String(a.duration ?? '?').padEnd(8)} ${a.durationSec.padEnd(10)} ${a.loopLabel}`;
    console.log(row);
});
