import React from 'react';
import { RaisedButton, RadioButton, RadioButtonGroup } from 'material-ui';
import heroes from 'dotaconstants/build/heroes.json';
import querystring from 'querystring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';
import HeroImage from '../Visualizations/HeroImage';
import TableSkeleton from '../Skeletons/TableSkeleton';
import Heading from '../Heading/Heading';
import ExplorerOutputSection from './../Explorer/ExplorerOutputSection';
import getQueryString from './getQueryString';
import {
  StyledHeroSelector,
  StyledSelectedHeroes,
  StyledCombos,
  StyledInputFilter,
} from './Styles';
import { formatTemplateToString, escapeRegExp, IMAGESIZE_ENUM } from '../../utility';
import config from '../../config';

const styles = {
  radioButton: {
    root: {
      display: 'inline-block',
      width: 'auto',
      whiteSpace: 'nowrap',
      marginRight: 5,
    },
    icon: {
      marginRight: 1,
    },
  },
};

const InputFilter = ({
  handleChange,
  value,
  setInputRef,
  reset,
  filterText,
}) => (
  <StyledInputFilter>
    <div className="container">
      <ActionSearch style={{ marginRight: 6, opacity: '.6', verticalAlign: 'middle' }} />
      <TextField
        aria-label={filterText}
        ref={setInputRef}
        hintText={filterText}
        value={value}
        onChange={handleChange}
        style={{ width: 150 }}
      />
      <div
        aria-label="clear hero filter"
        className="reset-button"
        onClick={reset}
        onKeyPress={reset}
        role="button"
        tabIndex="0"
      >
        x
      </div>
    </div>
  </StyledInputFilter>
);

const heroesArray = Object.keys(heroes).map(id => heroes[id]).sort((a, b) => a.localized_name.localeCompare(b.localized_name));

const HeroSelector = ({
  id,
  handleHeroSelection,
  selected,
  teamAFull,
  teamBFull,
  isFiltered,
  heroName
}) => (
  <StyledHeroSelector selected={selected} isFiltered={isFiltered}>
    <HeroImage
      id={id} 
      imageSizeSuffix={IMAGESIZE_ENUM.SMALL.suffix} 
      style={{position: 'absolute', width: 200, left: -30, opacity: .5, filter: 'blur(5px)'}}
    />
    <HeroImage id={id} imageSizeSuffix={IMAGESIZE_ENUM.SMALL.suffix} style={{width: 'auto', height: 40, zIndex: 2}}/>
    <div className={`ts-container ${selected ? 'selected' : ''}`}>
      <div
        aria-label={`${heroName} team A`}
        className={`ts ts-left ${teamAFull ? 'no-event' : ''}`}
        onClick={handleHeroSelection(id, 'teamA')}
        onKeyPress={handleHeroSelection(id, 'teamA')}
        role="button"
        tabIndex="0"
      >
        A
      </div>
      <div
        aria-label={`${heroName} team B`}
        className={`ts ts-right ${teamBFull ? 'no-event' : ''}`}
        onClick={handleHeroSelection(id, 'teamB')}
        onKeyPress={handleHeroSelection(id, 'teamB')}
        role="button"
        tabIndex="0"
      >
        B
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
  teamA, teamB, handleHeroDeSelection, strings
}) => (
  <StyledSelectedHeroes>
    <div className="team-container left">
      <div className="team-title team-a">{formatTemplateToString(strings.team, 'A')}</div>
      <div>
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
    </div>
    <div className="seperator"/>
    <div className="team-container right">
      <div className="team-title team-b">{formatTemplateToString(strings.team, 'B')}</div>
      <div>
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
    </div>
  </StyledSelectedHeroes>
);

SelectedHeroes.propTypes = {
  handleHeroDeSelection: PropTypes.func,
  strings: PropTypes.shape({}),
  teamA: PropTypes.arrayOf(PropTypes.number),
  teamB: PropTypes.arrayOf(PropTypes.number),
};

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
}

class Combos extends React.Component {
  static propTypes = {
    strings: PropTypes.shape({}),
  };

  parsedUrlQuery = querystring.parse(window.location.search.substring(1)); // eslint-disable-line react/sort-comp

  state = {
    queryType: this.parsedUrlQuery.queryType || 'public',
    teamA: asArray(this.parsedUrlQuery.teamA).map(Number),
    teamB: asArray(this.parsedUrlQuery.teamB).map(Number),
    queryResult: {},
    loading: false,
    searchValue: '',
  };

  componentDidMount() {
    if (this.state.teamA.length > 0 || this.state.teamB.length > 0) {
      this.sendRequest();
    }
  }

  setInputRef = (input) => {
    this.inputRef = input;
  };

  resetSearchValue = () => {
    if (this.state.searchValue.length > 0) {
      this.inputRef.focus();
    }
    this.setState({ searchValue: '' });
  };

  handleChange = e => this.setState({ searchValue: e.target.value });
  
  handleHeroSelection = resetSearchValue => (heroID, team) => () => {
    if(this.state.loading) {
      return;
    }
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
    if(this.state.loading) {
      return;
    }
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
    let data = json;
    const { teamA, teamB } = this.state;

    // rearrange order of heroes so the results are displayed in the same order as selection
    data.forEach(row => {
      if(!row.teama.includes(teamA[0]) && !row.teamb.includes(teamB[0])) {
        const temp = row.teama;
        row.teama = row.teamb
        row.teamb = temp;
        row.teamawin = !row.teamawin;
      }  
      row.teama.sort((a, b) =>  teamA.indexOf(b) - teamA.indexOf(a))
      row.teama = [...row.teama.slice(teamA.length, 5), ...row.teama.slice(0, teamA.length)]
      row.teamb.sort((a, b) =>  teamB.indexOf(a) - teamB.indexOf(b))
      row.teamb = [...row.teamb.slice(5 - teamB.length, 5), ...row.teamb.slice(0, 5 - teamB.length)]
    })

    if (this.state.queryType === 'public') {
      // adapt json format so ExplorerOutputSection can process it
      data = {};
      data.rows = json.map(el => ({
        ...el,
        team_a_win: el.teamawin,
        team_a_composition: el.teama,
        team_b_composition: el.teamb,
      }));
      data.rowCount = json.length;
      data.fields = ['match_id', 'start_time', 'team_a_composition', 'team_b_composition'].map(el => ({
        name: el,
      }));
    }
    this.setState({ queryResult: data, loading: false });
  };

  sendRequest = () => {
    const { teamA, teamB } = this.state;

    this.setState({ loading: true }, () =>
      fetch(`${config.VITE_API_HOST}/api/` +

      `${this.state.queryType === 'pro' ?
        `explorer?sql=${encodeURIComponent(this.buildQueryString())}` :
        `findMatches?${querystring.stringify({ teamA, teamB })}`}`)

        .then(res => res.json())
        .then(this.handleResponse));
  };

  handleSubmit = () => {
    const { teamA, teamB, queryType } = this.state;
    window.history.pushState(
      '',
      '',
      `?${querystring.stringify({ teamA, teamB, queryType })}`,
    );
    this.sendRequest();
  };

  handleCancel = () => {
    this.setState({ loading: false });
    window.stop();
  }

  handleRadioButtonChange = (_, value) => {
    this.setState({ queryType: value });
  }

  filterAndRenderElements = (searchValue, resetSearchValue) => heroesArray.map(hero => (
    <HeroSelector
      id={hero.id}
      heroName={hero.localized_name}
      handleHeroSelection={this.handleHeroSelection(resetSearchValue)}
      selected={[...this.state.teamA, ...this.state.teamB].includes(hero.id)}
      teamAFull={this.state.teamA.length > 4}
      teamBFull={this.state.teamB.length > 4}
      strings={this.props.strings}
      isFiltered={!new RegExp(escapeRegExp(searchValue), 'i').test(hero.localized_name)}
    />
    ));

  render() {
    const { teamA, teamB } = this.state;
    const { strings } = this.props;
    const noHeroesSelected = !teamA.length && !teamB.length;
    return (
      <StyledCombos>
        <Heading title={strings.combos_title} subtitle={strings.combos_description} className="top-heading"/>
        <div className="main-section">
          <InputFilter
            handleChange={this.handleChange}
            value={this.state.searchValue}
            reset={this.resetSearchValue}
            setInputRef={this.setInputRef}
            filterText={strings.placeholder_filter_heroes}
          />
          <div className="hero-overview">
            {this.filterAndRenderElements(this.state.searchValue, this.resetSearchValue)}
          </div>
          <SelectedHeroes
            teamA={teamA}
            teamB={teamB}
            handleHeroDeSelection={this.handleHeroDeSelection}
            strings={strings}
          />
          <div className="submit-section">
            <RadioButtonGroup
              name="queryType"
              defaultSelected={this.state.queryType}
              onChange={this.handleRadioButtonChange}
            >
              <RadioButton
                value="public"
                label={strings.public_matches}
                style={styles.radioButton.root}
                iconStyle={styles.radioButton.icon}
              />
              <RadioButton
                value="pro"
                label={strings.pro_matches}
                style={{ ...styles.radioButton.root, marginRight: 0 }}
                iconStyle={styles.radioButton.icon}
              />
            </RadioButtonGroup>
            <RaisedButton
              label={this.state.loading ? strings.explorer_cancel_button : strings.request_submit}
              onClick={this.state.loading ? this.handleCancel : this.handleSubmit}
              buttonStyle={{ backgroundColor: this.state.loading ? '#822e2e' : 'rgba(23, 59, 90, 0.8)' }}
              style={{ display: 'block', marginTop: 5 }}
              disabled={noHeroesSelected}
            />
          </div>
        </div>
        <pre style={{ color: 'red' }}>{this.state.queryResult && this.state.queryResult.err}</pre>
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
            fields={this.state.queryResult.fields && this.state.queryResult.fields.filter(field => field.name !== 'team_a_win')}
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
