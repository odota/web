import { defaultSort } from 'utility';

export const getTable = (state, id) => state.app.table[id] || {
  currentPage: 0,
  totalPages: 0,
  sortState: '',
  sortField: '',
  sortFn: f => f,
};
export const getCurrentPage = (state, id) => getTable(state, id).currentPage;
export const getTotalPages = (state, id) => getTable(state, id).totalPages;
export const getSortState = (state, id) => getTable(state, id).sortState;
export const getSortField = (state, id) => getTable(state, id).sortField;
export const getSortFn = (state, id) => getTable(state, id).sortFn;
export const getSortedData = data => (state, id) => (
  !getSortField(state, id) ?
  data :
  defaultSort(
    data,
    getSortState(state, id),
    getSortField(state, id),
    getSortFn(state, id),
  ));
