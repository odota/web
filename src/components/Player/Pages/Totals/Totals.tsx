import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Card from './Card';
import { getPlayerTotals } from '../../../../actions';
import Container from '../../../Container/Container';
import useStrings from '../../../../hooks/useStrings.hook';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
`;

const totalsToShow: Record<string, number | string> = {
  kills: 1,
  deaths: 1,
  assists: 1,
  last_hits: 1,
  denies: 1,
  duration: 1,
  level: 1,
  hero_damage: 1,
  tower_damage: 1,
  hero_healing: 1,
  stuns: 'parsed',
  tower_kills: 'parsed',
  neutral_kills: 'parsed',
  courier_kills: 'parsed',
  purchase_tpscroll: 'parsed',
  purchase_ward_observer: 'parsed',
  purchase_ward_sentry: 'parsed',
  purchase_gem: 'parsed',
  purchase_rapier: 'parsed',
  pings: 'parsed',
};

const drawElement = (element: any, type: number | string) => {
  if (totalsToShow[element.field] === type) {
    return <Card total={element} />;
  }
  return null;
};

const Totals = ({ data, error, loading }: TotalsProps) => {
  const strings = useStrings();
  return (
    <div>
      <Container
        title={strings.heading_all_matches}
        error={error}
        loading={loading}
      >
        <CardContainer>
          {data.map((element) => drawElement(element, 1))}
        </CardContainer>
      </Container>
      <Container
        title={strings.heading_parsed_matches}
        error={error}
        loading={loading}
      >
        <CardContainer>
          {data.map((element) => drawElement(element, 'parsed'))}
        </CardContainer>
      </Container>
    </div>
  );
};

type TotalsProps = {
  data: any[];
  error: string;
  loading: boolean;
  getPlayerTotals: Function;
  location: {
    key?: string;
    search?: string;
  };
  playerId: string;
};

const getData = (props: TotalsProps) => {
  props.getPlayerTotals(props.playerId, props.location.search);
};

class TotalsPage extends React.Component<TotalsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: TotalsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Totals {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerTotals.data,
  error: state.app.playerTotals.error,
  loading: state.app.playerTotals.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerTotals: (playerId: string, options: any) =>
    dispatch(getPlayerTotals(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TotalsPage);
