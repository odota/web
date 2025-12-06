import React from 'react';

import { connect } from 'react-redux';
import { getPlayerHeroes } from '../../../../actions';
import Table from '../../../Table/Table';
import Container from '../../../Container/Container';
import { playerHeroesColumns } from './playerHeroesColumns';
import useStrings from '../../../../hooks/useStrings.hook';

const Heroes = ({ data, playerId, error, loading }: HeroesProps) => {
  const strings = useStrings();
  return (
    <Container title={strings.heading_heroes} error={error} loading={loading}>
      <Table
        paginated
        columns={playerHeroesColumns(playerId, strings)}
        data={data}
      />
    </Container>
  );
};

type HeroesProps = {
  data: any[];
  error: string;
  loading: boolean;
  playerId: string;
  getPlayerHeroes: Function;
  location: {
    key?: string;
    search?: string;
  };
};

const getData = (props: HeroesProps) => {
  props.getPlayerHeroes(props.playerId, props.location.search);
};

class HeroesPage extends React.Component<HeroesProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: HeroesProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Heroes {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerHeroes.data,
  error: state.app.playerHeroes.error,
  loading: state.app.playerHeroes.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerHeroes: (playerId: string, options: any) =>
    dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage);
