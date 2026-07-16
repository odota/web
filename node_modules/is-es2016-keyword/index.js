var KEYWORD_RE = /^(if|in|do|var|for|let|new|try|this|else|case|void|with|enum|null|true|false|async|await|while|break|catch|throw|const|yield|class|super|return|typeof|delete|switch|export|import|default|finally|extends|function|continue|debugger|instanceof)$/;

module.exports = function isES2016Keyword (str) {
    return KEYWORD_RE.test(str);
};
