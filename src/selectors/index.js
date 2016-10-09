// We need to remove this eslint rule because there is a perfectly legitimate
// reason to not have a default export if there is room for expansion of the number
// of exports. So if we follow this rule, we actually are doing harm since
// a file like this means we would have to refactor every import of the 'default'
// export if we add another thing. And in these kinds of cases, there is no reason
// that this should be the default export since it's all selectors.
export { default } from 'selectors/getPlayerTrend';
export { default as getCumulativeDataByField } from 'selectors/getPlayerTrend';
