import { benchmarkActions } from 'actions';
import { REDUCER_KEY } from 'reducers';

const initialState = {
  loading: false,
  error: false,
  hero_id: null,
  result: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case benchmarkActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        result: null,
        hero_id: null,
      };
    case benchmarkActions.OK: {
      const result = action.payload.result;
      const listStats = Object.keys(action.payload.result);
      const listPercentiles = result[listStats[0]].map(i => i.percentile);
      const benchmarks = [];

      for (let i = 0; i < listPercentiles.length; i++) {
        const percentilePerStat = {
          percentile: listPercentiles[i],
        };

        listStats.forEach(stat => {
          percentilePerStat[stat] = result[stat][i].value;
        });
        benchmarks.push(percentilePerStat);
      }

      return {
        ...state,
        error: false,
        loading: false,
        hero_id: action.payload.hero_id,
        result: benchmarks,
      };
    }
    case benchmarkActions.ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        result: null,
        hero_id: null,
      };
    default:
      return state;
  }
};

export const benchmark = {
  getReducer: (state) => state[REDUCER_KEY].heroBenchmark,
  getHeroId: (state) => benchmark.getReducer(state).hero_id,
  getBenchmarks: (state) => benchmark.getReducer(state).result,
  getLoading: (state) => benchmark.getReducer(state).loading,
  getError: (state) => benchmark.getReducer(state).error,
};
