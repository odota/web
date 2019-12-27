import { MatchCategory } from './Match/MatchCategory';
import { Match } from './Match/Match';

//  Below is what my IDE auto generates for import
// import { MatchCategory } from 'src/types/Match/MatchCategory'
// import { Match } from 'src/types/Match/Match'

const testEnum = MatchCategory.PRO_BAN;
const testType: Match = {
  params: {
    heroId: 123,
    info: '123',
  },
};

type State = {
  test: string;
}

const handleChange = <K extends keyof State>(key: Pick<State, K>) => {
  //  do some stuff
};
