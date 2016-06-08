
export const SORT_ENUM = {
  0: 'asc',
  1: 'desc',
  asc: 0,
  desc: 1,
  next: (state) => SORT_ENUM[(state >= 1 ? 0 : state + 1)],
};
