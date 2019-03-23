import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import heroes from 'dotaconstants/build/heroes.json';
import querystring from 'querystring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeroImage from '../Visualizations/HeroImage';
import TableSkeleton from '../Skeletons/TableSkeleton';
import Heading from '../Heading/Heading';
import ExplorerOutputSection from './../Explorer/ExplorerOutputSection';
import getQueryString from './getQueryString';
import HorizontalMenu from '../Visualizations/HorizontalMenu';
import {
  StyledHeroSelector,
  StyledSelectedHeroes,
  StyledCombos,
} from './Styles';

const heroesArray = Object.keys(heroes).map(id => heroes[id]);

const HeroSelector = ({
  id,
  handleHeroSelection,
  selected,
  teamAFull,
  teamBFull,
  strings,
}) => (
  <StyledHeroSelector>
    <HeroImage id={id} />
    <div className={`ts-container ${selected ? 'selected' : ''}`}>
      <div
        className={`ts ts-left ${teamAFull ? 'no-event' : ''}`}
        onClick={handleHeroSelection(id.toString(), 'teamA')}
        onKeyPress={handleHeroSelection(id.toString(), 'teamA')}
        role="button"
        tabIndex="0"
      >
        {strings.add_team}
      </div>
      <div
        className={`ts ts-right ${teamBFull ? 'no-event' : ''}`}
        onClick={handleHeroSelection(id.toString(), 'teamB')}
        onKeyPress={handleHeroSelection(id.toString(), 'teamB')}
        role="button"
        tabIndex="0"
      >
        {strings.add_opp_team}
      </div>
    </div>
  </StyledHeroSelector>
);

HeroSelector.propTypes = {
  id: PropTypes.number,
  handleHeroSelection: PropTypes.func,
  selected: PropTypes.bool,
  teamAFull: PropTypes.bool,
  teamBFull: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const SelectedHeroes = ({
  teamA, teamB, handleHeroDeSelection, strings,
}) => (
  <StyledSelectedHeroes>
    <div className="team-container">
      {[4, 3, 2, 1, 0].map(i =>
        (teamA[i] ? (
          <HeroImage
            id={teamA[i]}
            className="hero-img"
            onClick={handleHeroDeSelection(i, 'teamA')}
          />
        ) : (
          <div className="hero-placeholder hero-img" />
        )))}
    </div>
    <div className="seperator">{strings.vs}</div>
    <div className="team-container">
      {[0, 1, 2, 3, 4].map(i =>
        (teamB[i] ? (
          <HeroImage
            id={teamB[i]}
            className="hero-img"
            onClick={handleHeroDeSelection(i, 'teamB')}
          />
        ) : (
          <div className="hero-placeholder hero-img" />
        )))}
    </div>
  </StyledSelectedHeroes>
);

SelectedHeroes.propTypes = {
  handleHeroDeSelection: PropTypes.func,
  strings: PropTypes.shape({}),
  teamA: PropTypes.arrayOf(PropTypes.number),
  teamB: PropTypes.arrayOf(PropTypes.number),
};

class Combos extends React.Component {
  static propTypes = {
    strings: PropTypes.shape({}),
  };

  state = {
    teamA: [],
    teamB: [],
    queryResult: {},
    loading: false,
    ...querystring.parse(window.location.search.substring(1)),
  };

  componentDidMount() {
    if (this.state.teamA.length > 0 || this.state.teamB.length > 0) {
      this.sendRequest();
    }
  }

  handleHeroSelection = resetSearchValue => (heroID, team) => () => {
    const { teamA, teamB } = this.state;
    if (this.state[team].length < 5 && ![...teamA, ...teamB].includes(heroID)) {
      this.setState(
        {
          [team]: [...this.state[team], heroID],
        },
        resetSearchValue,
      );
    }
  };

  handleHeroDeSelection = (index, team) => () => {
    this.setState({
      [team]: [
        ...this.state[team].slice(0, index),
        ...this.state[team].slice(index + 1),
      ],
    });
  };

  buildQueryString = () => {
    const { teamA, teamB } = this.state;
    return getQueryString(teamA, teamB);
  };

  handleResponse = (json) => {
    this.setState({ queryResult: json, loading: false });
  };

  sendRequest = () => {
    const queryString = this.buildQueryString();
    this.setState({ loading: true }, () =>
      fetch(`${
        process.env.REACT_APP_API_HOST
      }/api/explorer?sql=${encodeURIComponent(queryString)}`)
        .then(res => res.json())
        .then(this.handleResponse));
  };

  handleSubmit = () => {
    const { teamA, teamB } = this.state;
    window.history.pushState(
      '',
      '',
      `?${querystring.stringify({ teamA, teamB })}`,
    );
    this.sendRequest();
  };

  handleCancel = () => {
    this.setState({ loading: false });
    window.stop();
  }

  filterAndRenderElements = (searchValue, resetSearchValue) => {
    const filteredHeroesArray = heroesArray.filter(hero =>
      (searchValue
        ? new RegExp(searchValue, 'i').test(hero.localized_name)
        : true));

    return [
      ...(filteredHeroesArray.length > 0 ? filteredHeroesArray : heroesArray),
    ].map(hero => (
      <HeroSelector
        id={hero.id}
        handleHeroSelection={this.handleHeroSelection(resetSearchValue)}
        selected={[...this.state.teamA, ...this.state.teamB].includes(hero.id.toString())}
        teamAFull={this.state.teamA.length > 4}
        teamBFull={this.state.teamB.length > 4}
        strings={this.props.strings}
      />
    ));
  };

  render() {
    const { teamA, teamB } = this.state;
    const { strings } = this.props;
    return (
      <StyledCombos>
        <Heading title={strings.combos_title} subtitle={strings.combos_description} />
        <HorizontalMenu
          filterAndRenderElements={this.filterAndRenderElements}
          filterText={strings.placeholder_filter_heroes}
        />
        <SelectedHeroes
          teamA={teamA}
          teamB={teamB}
          handleHeroDeSelection={this.handleHeroDeSelection}
          strings={strings}
        />
        <RaisedButton
          label={this.state.loading ? strings.explorer_cancel_button : strings.request_submit}
          onClick={this.state.loading ? this.handleCancel : this.handleSubmit}
          style={{ marginBottom: 10 }}
          buttonStyle={{ backgroundColor: this.state.loading ? '#822e2e' : 'rgba(23, 59, 90, 0.8)' }}
        />
        <pre style={{ color: 'red' }}>{this.state.queryResult.err}</pre>
        <Heading
          title={strings.explorer_results}
          subtitle={`${
            (this.state.queryResult.rows || []).length
          } ${strings.explorer_num_rows}`}
        />
        {this.state.loading ? (
          <TableSkeleton />
        ) : (
          <ExplorerOutputSection
            rows={this.state.queryResult.rows}
            fields={this.state.queryResult.fields}
          />
        )}
      </StyledCombos>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Combos);
