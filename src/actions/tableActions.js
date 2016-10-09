const SET_CURRENT_PAGE = 'table/SET_CURRENT_PAGE';
const NEXT_PAGE = 'table/NEXT_PAGE';
const PREV_PAGE = 'table/PREV_PAGE';
const SORT = 'table/SORT';

export const tableActions = {
  SET_CURRENT_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  SORT,
};

export const sortTable = id => (sortField, sortState, sortFn) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
  id,
});

export const setCurrentPage = (id, pageNumber) => ({
  type: SET_CURRENT_PAGE,
  id,
  pageNumber,
});

export const nextPage = id => ({
  type: NEXT_PAGE,
  id,
});

export const prevPage = id => ({
  type: PREV_PAGE,
  id,
});
