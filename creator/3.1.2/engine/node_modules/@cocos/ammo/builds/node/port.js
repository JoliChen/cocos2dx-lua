const { readFileSync, writeFileSync } = require('fs');

const header = readFileSync('./ammo.js.start').toString();
const footer = readFileSync('./ammo.js.end').toString();
const body = readFileSync('./../ammo.js');
const time = "//" + new Date() + "\n";

writeFileSync('./ammo.cocos.js', [time, header, body, footer].join('\n'));
