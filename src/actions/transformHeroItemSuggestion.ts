const transformHeroItemSuggestion = (data: any) => {
  const res: Record<string, any> = {};
  Object.entries<any>(data).forEach(([gameStage, itemsAsJSON]) => {
    res[gameStage] = {};
    Object.entries<any>(itemsAsJSON)
      .sort((a, b) => (a[1] > b[1] ? -1 : 1))
      .forEach(([itemId, quantity]) => {
        res[gameStage][itemId] = quantity;
      });
  });
  return [res];
};
export default transformHeroItemSuggestion;
