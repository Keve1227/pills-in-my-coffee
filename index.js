const dictionary = require("./dictionary.json");

let x = 0, w = 0, s = 0xb5ad4ece;

let random = function () {
    for (let i = 0; i < 128; i++) {
        w += s;
        w &= 0xffffffff;

        x *= x;
        x += w;
        x &= 0xffffffff;
    }

    let rand = (x >> 16) + (x << 16);
    if (rand < 0) rand += 0xffffffff;

    return rand / 0xffffffff;
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
        if (prefix[prefix.length - 1] === 'o' && root[0] === 'o') {
            prefix += '-';
        } else if (prefix[prefix.length - 1] === root[0] && startsWithVowel(root)) {
            if (prefix[prefix.length - 1] !== 'o') {
                prefix += 'o';
            }
        }
    }

    return (prefix ? prefix : "") + root + suffix;
}

exports.setSeed = function (seed) {
    s = seed;
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