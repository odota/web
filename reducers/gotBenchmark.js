import { benchmarkActions } from './../actions';
import { REDUCER_KEY } from './../reducers';

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
    case benchmarkActions.OK:
      const result = action.payload.result;
      const list_stats = Object.keys(action.payload.result);
      const list_percentiles = result[list_stats[0]].map(i => i.percentile);

      let benchmarks = [];

      for (let i = 0; i < list_percentiles.length; i++) {
        let percentile_per_stat = {
          percentile: list_percentiles[i],
        };

        list_stats.forEach(stat => {
          percentile_per_stat[stat] = result[stat][i].value
        });
        benchmarks.push(percentile_per_stat);
      }

      return {
        ...state,
        error: false,
        loading: false,
        hero_id: action.payload.hero_id,
        result: benchmarks,
      };
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
  getReducer: (state) => state[REDUCER_KEY].gotBenchmark,
  getHeroId: (state) => benchmark.getReducer(state).hero_id,
  getHero: (state) => state[REDUCER_KEY].heroes[benchmark.getHeroId(state)],
  getBenchmarks: (state) => benchmark.getReducer(state).result,
  getLoading: (state) => benchmark.getReducer(state).loading,
  getError: (state) => benchmark.getReducer(state).error,
}
