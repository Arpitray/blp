const fs = require('fs');
const buf = fs.readFileSync('public/websitepremium.riv');

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

console.log('--- State Machines ---');
for (let offset = 0; offset < buf.length - 10; offset++) {
    if (buf[offset] === 0x35) { // 0x35 = 53 = StateMachine
        let p = offset + 1;
        let maxRead = 40;
        let name = null;
        while (p < offset + maxRead && p < buf.length) {
            const propKey = buf[p];
            if (propKey === 0x00) break;
            p++;
            if (propKey === 0x37) { // 55 = name
                try {
                    const res = readString(buf, p);
                    if (/^[a-zA-Z0-9_ -]+$/.test(res.str) && res.str.length > 2) {
                        name = res.str;
                    }
                    p += res.length;
                } catch { break; }
            } else {
                // skip value
                try {
                   if (propKey < 0x80) { // arbitrary skip... not trivial without knowing property types
                       break;
                   }
                } catch { break; }
                break;
            }
        }
        if (name) {
            console.log('Found StateMachine:', name);
        }
    }
}
