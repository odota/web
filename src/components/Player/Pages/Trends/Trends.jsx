/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TrendGraph } from 'components/Visualizations';
import {
  getPlayerTrends,
} from 'actions';
import ButtonGarden from 'components/ButtonGarden';
import trendNames from 'components/Player/Pages/matchDataColumns';
import Heading from 'components/Heading';
import Container from 'components/Container';
import strings from 'lang';
import heroes from 'dotaconstants/build/heroes.json';
import { formatSeconds, fromNow } from 'utility';
import styles from './Trends.css';

const Trend = ({ routeParams, columns, playerId, error, loading, history }) => {
  const selectedTrend = routeParams.subInfo || trendNames[0];
  const trendStr = strings[`heading_${selectedTrend}`];
  const unit = selectedTrend === 'win_rate' ? '%' : '';
  return (
    <div style={{ fontSize: 10 }}>
      <Heading title={strings.trends_name} subtitle={strings.trends_description} />
      <ButtonGarden
        onClick={buttonName => history.push(`/players/${playerId}/trends/${buttonName}${window.location.search}`)}
        buttonNames={trendNames}
        selectedButton={selectedTrend}
      />
      <Container
        className={styles.container}
        style={{ fontSize: 10 }}
        error={error}
        loading={loading}
      >
        <TrendGraph
          columns={columns}
          name={selectedTrend}
          tooltip={{
            contents: (d) => {
              const data = columns[d[0].index];
              return `<div class="${styles.tooltipWrapper}">
                <div class="${styles.value}">
                  ${selectedTrend === 'win_rate' ? '' : strings.trends_tooltip_average}
                  ${' '}${trendStr}: ${data.value}${unit}
                </div>
                <div class="${styles.match}">
                  <div>
                    <div>
                      <span class="${data.win ? styles.win : styles.loss}">
                        ${data.win ? strings.td_win : strings.td_loss}
                      </span>
                      <span class="${styles.time}">
                        ${fromNow(data.start_time)}
                      </span>
                    </div>
                    <div>
                      ${strings[`game_mode_${data.game_mode}`]}
                    </div>
                    <div>
                      ${formatSeconds(data.duration)}
                    </div>
                    ${selectedTrend === 'win_rate'
                      ? ''
                      : `<div class="${styles.matchValue}">
                          ${trendStr}: ${data.independent_value}${unit}
                        </div>`}
                  </div>
                  <div class="${styles.hero}">
                    <img class="${styles.heroImg}" src="${API_HOST}${heroes[data.hero_id].img}" />
                  </div>
                </div>
              </div>`;
            },
          }}
          onClick={(p) => {
            const matchId = columns[p.index].match_id;
            history.push(`/matches/${matchId}`);
          }}
        />
      </Container>
    </div>
  );
};

const getData = (props) => {
  const trendName = props.routeParams.subInfo || trendNames[0];
  props.getPlayerTrends(props.playerId, props.location.search, trendName);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId
      || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Trend {...this.props} />;
  }
}

const mapStateToProps = state => ({
  columns: state.app.playerTrends.data,
  loading: state.app.playerTrends.loading,
  error: state.app.playerTrends.error,
});

export default withRouter(connect(mapStateToProps, { getPlayerTrends })(RequestLayer));
