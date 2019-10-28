const dictionary = require("./dictionary.json");

let randomState = {
    a: Math.floor(Math.random() * 0xffffffff),
    b: Math.floor(Math.random() * 0xffffffff),
    c: Math.floor(Math.random() * 0xffffffff),
    d: Math.floor(Math.random() * 0xffffffff),
    counter: 0
}

let random = function () {
    let t;

    for (let i = 0; i < 13; i++) {
        t = randomState.d;
        let s = randomState.a;
    
        randomState.d = randomState.c;
        randomState.c = randomState.b;
        randomState.b = s;
    
        t ^= t >> 2;
        t ^= (t << 1) & 0xffffffff;
        t ^= s ^ ((s << 4) & 0xffffffff);
        randomState.a = t;
    }
    
    randomState.counter += 362437;

    let rand = Math.abs(((t + randomState.counter) & 0xffffffff) / 0x7f7f7f7f);
    if (rand > 1) rand = 2 - rand;

    return rand;
}

let startsWithVowel = function (str) {
    if (!str || str.length < 1) return true;

    return "aeiou".includes(str[0]);
}

let endsWithVowel = function (str) {
    if (!str || str.length < 1) return false;

    return "aeiou".includes(str[str.length - 1]);
}

/* Exports */

exports.composeWord = function (root, suffix, prefix) {
    while (true) {
        if (root[root.length - 1] === suffix[0] && startsWithVowel(suffix)) {
            suffix = suffix.substr(1);
        } else if (endsWithVowel(root) && startsWithVowel(suffix)) {
            root = root.substr(0, root.length - 1);
        } else {
            break;
        }
    }

    if (prefix) {
        if (prefix[prefix.length - 1] === 'o' && root[0] === 'o' && !prefix.endsWith("io")) {
            prefix += '-';
        } else if (prefix[prefix.length - 1] === root[0] && startsWithVowel(root)) {
            if (prefix[prefix.length - 1] !== 'o') {
                prefix += 'o';
            } else {
                prefix = prefix.substr(0, prefix.length - 1);
            }
        }
    }

    return (prefix ? prefix : "") + root + suffix;
}

exports.setSeed = function (seed) {
    randomState.counter = 0;

    randomState.a = seed;
    randomState.b = seed;
    randomState.c = seed;
    randomState.d = seed;
}

exports.randomRoot = function () {
    return dictionary.roots[Math.floor(dictionary.roots.length * random())];
}

exports.randomSuffix = function () {
    return dictionary.suffixes[Math.floor(dictionary.suffixes.length * random())];
}

exports.randomPrefix = function () {
    return dictionary.prefixes[Math.floor(dictionary.prefixes.length * random())];
}