const SET_CURRENT_PAGE = 'table/SET_CURRENT_PAGE';
const NEXT_PAGE = 'table/NEXT_PAGE';
const PREV_PAGE = 'table/PREV_PAGE';

export const tableActions = {
  SET_CURRENT_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
};

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
