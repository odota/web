import React from 'react';
import TextField from 'material-ui/TextField';
import debounce from 'lodash/fp/debounce';
import editDistance from './editDistance';

const ExplorerOmnibox = (context, expandedFields) => (<TextField
  style={{ display: 'none' }}
  floatingLabelText="Omnibox"
  onChange={debounce((event, value) => {
    // Sample input 'dendi antimage'
    // Iterate over the fields and phrase tokens
    // Keep track of the best match for each field + token
    // TODO handle multi-word phrases like 'evil geniuses', 'gold per min'
    const result = [];
    Object.keys(expandedFields).forEach((field) => {
      value.split(' ').forEach((token) => {
        const distances = expandedFields[field].map(element => ({
          field,
          token,
          searchText: element.searchText,
          key: element.key,
          editDistance: editDistance(token.toLowerCase(), (element.searchText || element.text).toLowerCase()),
        }));
        distances.sort((a, b) => a.editDistance - b.editDistance);
        const bestMatch = distances[0];
        result.push(bestMatch);
      });
    });
    // TODO order by field keys for precedence (e.g. hero should match before player, use as tiebreak for equal distance)
    result.sort((a, b) => a.editDistance - b.editDistance);
    // For each field, pick the best token. A token can't be used more than once.
    // Minimizing the total is N*M time where N is the number of fields and M is the number of words
    // Apply state update with best fit (matchedBuilder)
    const alreadyUsedTokens = {};
    const alreadyUsedFields = {};
    const matchedBuilder = {};
    Object.keys(expandedFields).forEach(() => {
      for (let i = 0; i < result.length; i += 1) {
        const element = result[i];
        if (!alreadyUsedTokens[element.token] && !alreadyUsedFields[element.field]) {
          matchedBuilder[element.field] = element.key;
          alreadyUsedTokens[element.token] = true;
          alreadyUsedFields[element.field] = true;
          break;
        }
      }
    });
    context.setState({ ...context.state, builder: { ...matchedBuilder } });
  }, 1000)}
/>);

export default ExplorerOmnibox;
