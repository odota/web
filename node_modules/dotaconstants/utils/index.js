exports.HTML_REGEX = /(<([^>]+)>)/gi;

exports.mapAbilities = (tokens) => {
  const tokenKeys = Object.keys(tokens);
  tokenKeys.forEach(
    (key) => (tokens[key] = tokens[key].replace(exports.HTML_REGEX, ""))
  );
  return tokens;
};

const removeExtraneousWhitespacesFromString = (string) => {
  if (!string) { return ''; }

  return string.replace(/\s+/g, ' ').trim();
}

exports.cleanupArray = (array) => {
  if (!array) { return []; }

  return array.filter(n => removeExtraneousWhitespacesFromString(n));
}