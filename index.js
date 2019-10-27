const dictionary = require("./dictionary.json");

let startsWithVowel = function (str) {
    if (!startsWithVowel || startsWithVowel.length < 1) return true;

    return str.match(/.*[aeiou]$/i);
}

exports.composeWord = function (root, suffix, prefix) {
    if (startsWithVowel(suffix)) {
        root += 'o';
    }
    
    if (root[root.length - 1] === suffix[0]) {
        suffix = suffix.substr(1);
    }

    if (prefix && prefix[prefix.length - 1] === root[0]) {
        prefix += '-';
    }

    return (prefix ? prefix : "") + root + suffix;
}