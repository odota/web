const transformHeroItemSuggestion = (data) => {
  const res = {};
  Object.entries(data).forEach(([gameStage, itemsAsJSON]) => {
    res[gameStage] = {};
    Object.entries(itemsAsJSON)
      .sort((a, b) => (a[1] > b[1]) ? -1 : 1)
      .forEach(([itemId, quantity]) => {
        res[gameStage][itemId] = quantity
      });
  });
  return [res];
};
export default transformHeroItemSuggestion;
