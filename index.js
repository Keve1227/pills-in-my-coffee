const dictionary = require("./dictionary.json");

let hash = 0;

let random = function () {
    for (let i = 0; i < 32; i++) {
        hash += 0x5df2e8;
        hash *= 0x41a7;
        hash %= 0x7ffffffe;
        if (hash < 0) hash += 0x7ffffffe;
    }

    return hash / 0x7ffffffd;
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
    if (!startsWithVowel(suffix)) {
        root += 'o';
    }
    
    if (root[root.length - 1] === suffix[0] && startsWithVowel(suffix)) {
        suffix = suffix.substr(1);
    } else if (endsWithVowel(root) && startsWithVowel(suffix)) {
        root = root.substr(0, root.length - 1);
    }

    if (prefix) {
        if (prefix[prefix.length - 1] === root[0] && startsWithVowel(root)) {
            prefix += '-';
        } else if (endsWithVowel(prefix) && startsWithVowel(root)) {
            prefix = prefix.substr(0, prefix.length - 1);
        }
    }

    return (prefix ? prefix : "") + root + suffix;
}

exports.setSeed = function (seed) {
    hash = seed;
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