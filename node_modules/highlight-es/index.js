var chalk           = require('chalk');
var jsTokens        = require('js-tokens');
var isES2016Keyword = require('is-es2016-keyword');

var jsTokensRe = jsTokens.default;
var matchToToken = jsTokens.matchToToken;

var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

var defaultRenderer = {
    string:     chalk.green,
    punctuator: chalk.grey,
    keyword:    chalk.cyan,
    number:     chalk.magenta,
    regex:      chalk.magenta,
    comment:    chalk.grey.bold,
    invalid:    chalk.inverse
};

module.exports = function highlight (src, renderer) {
    renderer = renderer || defaultRenderer;

    return src.replace(jsTokensRe, function (value) {
        var match = [];

        for (var i = 0; i < arguments.length; i++)
            match.push(arguments[i]);

        var token = matchToToken(match);

        if (token.type === 'name' && isES2016Keyword(value, true))
            token.type = 'keyword';

        if (renderer[token.type]) {
            return value
                .split(NEWLINE)
                .map(function (str) {
                    return renderer[token.type](str);
                })
                .join('\n');
        }

        return value;
    });
};
