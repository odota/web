export const getClosestMatch = (dataSource, dataSourceConfig, filter, searchText) => {
  const requestsList = [];
  dataSource.forEach(item => {
    switch (typeof item) {
      case 'string':
        if (filter(searchText, item, item)) {
          requestsList.push({
            text: item,
            value: item,
          });
        }
        break;
      case 'object':
        if (item && typeof item[dataSourceConfig.text] === 'string') {
          const itemText = item[dataSourceConfig.text];
          if (!filter(searchText, itemText, item)) break;

          const itemValue = item[dataSourceConfig.value];
          requestsList.push({
            text: itemText,
            value: itemValue,
          });
        }
        break;
      default:
        break;
    }
  });
  return requestsList[0] || searchText;
};
