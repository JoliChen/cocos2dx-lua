const ps = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const options = {
    engineRoot: '',
    clear: false,
    nonVerbatimCopy: false,
    debug: false,
};
const argc = process.argv.length;
for (let i = 2; i < argc; i++) {
    const arg = process.argv[i];
    if (arg === '--engine' && i < argc - 1) {
        options.engineRoot = ps.resolve(process.argv[++i]);
    } else if (arg === '--default-engine') {
        options.engineRoot = 'default';
    } else if (arg === '--clear') {
        options.clear = true;
    } else if (arg === '--non-verbatim-copy') {
        options.nonVerbatimCopy = true;
    } else if (arg === '--debug') {
        options.debug = true;
    }
}

const defaultEngineRoot = ps.join(__dirname, '../../../engine');
const cacheFile = ps.join(__dirname, 'engine_root_cache.txt');
if (options.engineRoot) {
    if (options.engineRoot === 'default') options.engineRoot = defaultEngineRoot;
    if (fs.existsSync(options.engineRoot)) fs.writeFileSync(cacheFile, options.engineRoot);
} else {
    if (fs.existsSync(cacheFile)) options.engineRoot = fs.readFileSync(cacheFile);
    if (!options.engineRoot) options.engineRoot = defaultEngineRoot;
}

// TODO: remove this after state info refactor
const ignoreList = { PipelineStateInfo: true, BlendTarget: true, BlendState: true, DepthStencilState: true, RasterizerState: true };

let header = fs.readFileSync(ps.join(__dirname, '/../../cocos/renderer/gfx-base/GFXDef-common.h')).toString();
header = header.replace(/\r\n/g, '\n');

const enumRE = /enum\s+class\s+(\w+).*?{\s*?\n(.+?)};/gs;
const enumValueRE = /(\w+).*?(?:=\s*(.*?))?,/g;
const enumMap = {};
let enumCap = enumRE.exec(header);
while (enumCap) {
    const e = enumMap[enumCap[1]] = {};
    e.keys = {};

    if (options.nonVerbatimCopy) {
        let values = enumCap[2].replace(/\s*\/\/.*$/gm, '');
        let valueCap = enumValueRE.exec(values);
        let val = -1;
        while (valueCap) {
            if (valueCap[2]) {
                val = Number.parseInt(valueCap[2]);
                if (Number.isNaN(val)) val = valueCap[2];
                else val = `0x${val.toString(16)}`;
                e.customKey = true;
            } else {
                val++;
            }
            e.keys[valueCap[1]] = val;

            valueCap = enumValueRE.exec(values);
        }
    } else {
        e.fullContent = enumCap[2];
    }

    enumCap = enumRE.exec(header);
}

// now discard all block comments
header = header.replace(/\/\*.*?\*\//gs, '');
header = header.replace(/\s*[*&](.)/g, (_, c) => (c === '>' ? '' : ' ') + c);
header = header.replace(/(?:\w*::)?vector<(.+?)>/g, '$1[]');

const typedefRE = /using\s+(.+?)\s*=\s*(.+?);/gs;
const typedefMap = { lists: {}, others: [] };
let typedefCap = typedefRE.exec(header);
while (typedefCap) {
    const alias = typedefCap[1];
    const source = typedefCap[2];
    if (source.endsWith('[]')) {
        typedefMap.lists[alias] = source;
    } else {
        typedefMap.others.push({ alias, source });
    }
    typedefCap = typedefRE.exec(header);
}

const getMemberList = (() => {
    const getMatchingPair = (string, startIdx, begSymbol, endSymbol) => {
        if (string[startIdx] !== begSymbol) return startIdx;
        let depth = 1;
        let i = startIdx + 1;
        for (; i < string.length; i++) {
            if (string[i] === begSymbol) depth++;
            if (string[i] === endSymbol) depth--;
            if (depth === 0) break;
        }
        return i;
    };
    return (string, startIdx) => {
        let begIdx = startIdx;
        let endIdx = string.length;
        let scopeReady = false;
        for (let i = startIdx; i < endIdx; ++i) {
            if (string[i] === '/' && string[i+1] === '/') { // skip comments
                i = string.indexOf('\n', i);
            } else if (!scopeReady && string[i] === '{') {
                begIdx = i + 1;
                endIdx = getMatchingPair(string, i, '{', '}') - 1;
                scopeReady = true;
            } else if (string[i] === '(') { // end with any function declarations // TODO: fragile dependency on parenthesis
                endIdx = i;
            }
        }
        return string.slice(begIdx, endIdx);
    };
})();

const structRE = /struct\s+(\w+).*?{\s*(.+?)\s*};/gs;
const structMemberRE = /^\s*(const\w*\s*)?([\w\[\]]+)\s+?(\w+)(?:\s*=?\s*(.*?))?;(?:\s*\/\/\s*@ts-(.*?)$)?/gm;
const structMap = {};
let structCap = structRE.exec(header);
while (structCap) {
    const struct = structMap[structCap[1]] = {};
    struct.member = {};
    // structRE can not reliably extract the corrent member declaration range
    const memberList = getMemberList(header, structCap.index);

    let memberCap = structMemberRE.exec(memberList);
    while (memberCap) {

        let type = memberCap[2];
        let readonly = false;
        if (typedefMap.lists[type]) {
            type = typedefMap.lists[type];
        } else {
            type = type.replace(/(\b)(?:uintptr_t|uint|int|float)(\b)/, '$1number$1');
            type = type.replace(/(\b)(?:bool)(\b)/, '$1boolean$2');
            type = type.replace(/(\b)(?:String)(\b)/, '$1string$2');
        }
        if (memberCap[1]) readonly = true;
        const isArray = type.endsWith('[]');
        const decayedType = isArray ? type.slice(0, -2) : type;

        let value = memberCap[4];
        let n = Number.parseInt(value);
        if (!Number.isNaN(n)) {
            if (!value.startsWith('0x')) value = n; // keep hexadecimal numbers
        } else if (value) {
            value = value.replace(/GFX_MAX_ATTACHMENTS/, '4');
            value = value.replace(/GFX_INVALID_BINDING/, '-1');
            value = value.replace(/nullptr/, 'null!');
            value = value.replace('::', '.');
            value = value.replace(/{(.*?)}/, (_, value) => {
                const count = Number.parseInt(value);
                if (Number.isNaN(count)) return `[${value}]`;
                const ctorStr = `new ${type.slice(0, -2)}(), `;
                return `[${ctorStr.repeat(count).slice(0, -2)}]`;
            });
        } else {
            if (isArray) value = '[]';
            else if (type === 'string') value = '\'\'';
            else value = `new ${type}()`;
        }

        const info = struct.member[memberCap[3]] = {
            // all the overridable values
            readonly, type, value, isArray, decayedType
        };

        const directives = memberCap[5];
        if (directives) {
            if (directives.startsWith('nullable')) {
                info.type += ' | null';
                info.value = 'null';
            } else if (directives.startsWith('overrides')) {
                let overrides = {};
                try { overrides = yaml.load(memberCap[5].slice(9)); }
                catch (e) { console.warn(e); }
                Object.assign(info, overrides);
            }
        }

        memberCap = structMemberRE.exec(memberList);
    }

    structCap = structRE.exec(header);
}


let output = '';

for (const name of Object.keys(enumMap)) {
    const e = enumMap[name];
    output += `export enum ${name} {\n`;

    if (options.nonVerbatimCopy) {
        for (const key in e.keys) {
            if (e.customKey) {
                output += `    ${key} = ${e.keys[key]},\n`;
            } else {
                output += `    ${key},\n`;
            }
        }
    } else {
        output += e.fullContent;
    }

    output += `}\n\n`;
}

for (const typedef of typedefMap.others) {
    output += `export type ${typedef.alias} = ${typedef.source};\n`;
}
output += `\n`;

for (const name of Object.keys(structMap)) {
    if (name in ignoreList) continue;

    output += `export class ${name} {\n    declare private _token: never; `;
    output += `// to make sure all usages must be an instance of this exact class, not assembled from plain object`;
    output += `\n\n    constructor (\n`;

    const struct = structMap[name];
    for (const key in struct.member) {
        const { readonly, type, value } = struct.member[key];
        const decl = readonly ? `readonly ${key}` : key;
        if (value || value === 0) {
            output += `        public ${decl}: ${type} = ${value},\n`;
        } else {
            output += `        public ${decl}: ${type},\n`;
        }
    }

    output += `    ) {}\n`;

    if (!Object.keys(struct.member).some((k) => struct.member[k].readonly)) {
        output += `\n    public copy (info: ${name}) {\n`;
        for (const key in struct.member) {
            const { decayedType, isArray } = struct.member[key];
            if (isArray) {
                if (structMap[decayedType]) { // nested object
                    output += `        deepCopy(this.${key}, info.${key}, ${decayedType});\n`
                } else {
                    output += `        this.${key} = info.${key}.slice();\n`;
                }
            } else if (structMap[decayedType]) { // nested object
                output += `        this.${key}.copy(info.${key});\n`;
            } else {
                output += `        this.${key} = info.${key};\n`;
            }
        }
        output += `        return this;\n`;
        output += `    }\n`;
    }

    output += `}\n\n`;
}

if (options.clear) output = '';

const outputFile = options.debug ? `${__dirname}/define.ts` : ps.join(options.engineRoot, 'cocos/core/gfx/base/define.ts');
let source = fs.readFileSync(outputFile).toString();

const begGuardRE = /![A-Z ]+!\s*=+\s*\*\//;
const begGuardCap = source.match(begGuardRE);
const begIdx = begGuardCap ? begGuardCap.index + begGuardCap[0].length : undefined;

const endGuardRE = /\/\*\*\s*\*\s*=+\s*![A-Z ]+!/g;
let endGuardCap = endGuardRE.exec(source);
if (endGuardCap) endGuardCap = endGuardRE.exec(source);
const endIdx = endGuardCap ? endGuardCap.index : undefined;

fs.writeFileSync(outputFile, `${source.slice(0, begIdx)}\n\n${output}${source.slice(endIdx)}`);
