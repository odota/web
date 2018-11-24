import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import querystring from 'querystring';
import styled from 'styled-components';
import heroes from 'dotaconstants/build/heroes.json';
import patch from 'dotaconstants/build/patch.json';
import region from 'dotaconstants/build/region.json';
import { toggleShowForm } from '../../../actions/formActions';
import FormField from '../../Form/FormField';

const Styled = styled.div`
.formGroup {
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.hideForm {
  overflow: hidden;
  transition: max-height 0.2s;
  max-height: 0px;
}

.showForm {
  overflow: hidden;
  transition: max-height 0.2s;
}
`;

const getPeers = (props, context) => {
  fetch(`${process.env.REACT_APP_API_HOST}/api/players/${props.playerId}/peers`)
    .then(resp => resp.json())
    .then(json => context.setState({ peers: json }));
};

const setShowFormState = (props) => {
  if (Boolean(props.currentQueryString.substring(1)) !== props.showForm) {
    // If query string state has a filter, turn on the form
    props.toggleShowForm();
  }
};

class TableFilterForm extends React.Component {
  static propTypes = {
    showForm: PropTypes.bool,
    currentQueryString: PropTypes.string,
    history: PropTypes.shape({}),
    playerId: PropTypes.string,
    strings: PropTypes.shape({}),
  }

  constructor() {
    super();
    this.state = {
      peers: [],
    };
  }

  componentDidMount() {
    setShowFormState(this.props);
    getPeers(this.props, this);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.playerId !== this.props.playerId) {
      setShowFormState(nextProps);
      getPeers(nextProps, this);
    }
  }

  render() {
    const {
      showForm, currentQueryString, history, strings,
    } = this.props;
    const formSelectionState = querystring.parse(currentQueryString.substring(1));

    const heroList = Object.keys(heroes).map(id => ({
      text: heroes[id] && heroes[id].localized_name,
      value: id,
    })).sort((a, b) => a.text && a.text.localeCompare(b.text));

    const laneList = Object.keys(strings)
      .filter(str => str.indexOf('lane_role_') === 0)
      .map(str => str.substring('lane_role_'.length))
      .map(id => ({
        text: strings[`lane_role_${id}`],
        value: Number(id),
      }));

    const patchList = patch.map((_patch, index) => ({
      text: _patch.name,
      value: index,
    })).reverse();

    const modeList = Object.keys(strings)
      .filter(str => str.indexOf('game_mode_') === 0)
      .map(str => str.substring('game_mode_'.length))
      .map(id => ({
        text: strings[`game_mode_${id}`],
        value: id,
      }));

    const lobbyTypeList = Object.keys(strings)
      .filter(str => str.indexOf('lobby_type_') === 0)
      .map(str => str.substring('lobby_type_'.length))
      .map(id => ({
        text: strings[`lobby_type_${id}`],
        value: id,
      }));

    const regionList = Object.keys(region).map(id => ({
      text: strings[`region_${id}`],
      value: Number(id),
    }));

    const factionList = [{
      text: strings.general_radiant,
      value: 1,
    }, {
      text: strings.general_dire,
      value: 0,
    }];

    const resultList = [{
      text: strings.td_win,
      value: 1,
    }, {
      text: strings.td_loss,
      value: 0,
    }];

    const dateList = [{
      text: strings.filter_last_week,
      value: 7,
    }, {
      text: strings.filter_last_month,
      value: 30,
    }, {
      text: strings.filter_last_3_months,
      value: 90,
    }, {
      text: strings.filter_last_6_months,
      value: 180,
    }];

    const significantList = [{
      text: strings.filter_significant_include,
      value: 0,
    }];

    const gamesPlayedList = [{
      text: '5',
      value: 5,
    }, {
      text: '10',
      value: 10,
    }, {
      text: '15',
      value: 15,
    }, {
      text: '20',
      value: 20,
    }, {
      text: '25',
      value: 25,
    }];

    const partySize = [{
      text: '1',
      value: 1,
    }, {
      text: '2',
      value: 2,
    }, {
      text: '3',
      value: 3,
    }, {
      text: '4',
      value: 4,
    }, {
      text: '5',
      value: 5,
    }];

    return (
      <Styled>
        <div className={showForm ? 'showForm' : 'hideForm'}>
          <div className="formGroup">
            <FormField
              name="hero_id"
              label={strings.filter_hero_id}
              dataSource={heroList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="is_radiant"
              label={strings.filter_is_radiant}
              dataSource={factionList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="win"
              label={strings.filter_win}
              dataSource={resultList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="lane_role"
              label={strings.filter_lane_role}
              dataSource={laneList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="patch"
              label={strings.filter_patch}
              dataSource={patchList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="game_mode"
              label={strings.filter_game_mode}
              dataSource={modeList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="lobby_type"
              label={strings.filter_lobby_type}
              dataSource={lobbyTypeList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="date"
              label={strings.filter_date}
              dataSource={dateList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="region"
              label={strings.filter_region}
              dataSource={regionList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="with_hero_id"
              label={strings.filter_with_hero_id}
              dataSource={heroList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={5}
            />
            <FormField
              name="against_hero_id"
              label={strings.filter_against_hero_id}
              dataSource={heroList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={5}
            />
            <FormField
              name="included_account_id"
              label={strings.filter_included_account_id}
              dataSource={this.state.peers.map(peer => ({ text: `${peer.personaname}`, value: peer.account_id }))}
              formSelectionState={formSelectionState}
              history={history}
              limit={10}
            />
            <FormField
              name="excluded_account_id"
              label={strings.filter_excluded_account_id}
              dataSource={this.state.peers.map(peer => ({ text: `${peer.personaname}`, value: peer.account_id }))}
              formSelectionState={formSelectionState}
              history={history}
            />
            <FormField
              name="significant"
              label={strings.filter_significant}
              dataSource={significantList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="having"
              label={strings.explorer_having}
              dataSource={gamesPlayedList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="party_size"
              label={strings.filter_party_size}
              dataSource={partySize}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
          </div>
        </div>
      </Styled>
    );
  }
}

const mapStateToProps = state => ({
  showForm: state.app.form.show,
  currentQueryString: window.location.search,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  toggleShowForm: () => dispatch(toggleShowForm()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableFilterForm));
