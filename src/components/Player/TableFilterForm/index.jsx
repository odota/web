import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import querystring from 'querystring';
import strings from 'lang';
import { toggleShowForm } from '../../actions/formActions';
import FormField from '../Form/FormField';
import styled from 'styled-components';
import * as data from './TableFilter.config';

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

  componentWillUpdate(nextProps) {
    if (nextProps.playerId !== this.props.playerId) {
      setShowFormState(nextProps);
      getPeers(nextProps, this);
    }
  }

  render() {
    const { showForm, currentQueryString, history } = this.props;
    const formSelectionState = querystring.parse(currentQueryString.substring(1));
    return (
      <Styled>
        <div className={showForm ? 'showForm' : 'hideForm'}>
          <div className="formGroup">
            <FormField
              name="hero_id"
              label={strings.filter_hero_id}
              dataSource={data.heroList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="is_radiant"
              label={strings.filter_is_radiant}
              dataSource={data.factionList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="win"
              label={strings.filter_win}
              dataSource={data.resultList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="lane_role"
              label={strings.filter_lane_role}
              dataSource={data.laneList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="patch"
              label={strings.filter_patch}
              dataSource={data.patchList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="game_mode"
              label={strings.filter_game_mode}
              dataSource={data.modeList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="lobby_type"
              label={strings.filter_lobby_type}
              dataSource={data.lobbyTypeList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="date"
              label={strings.filter_date}
              dataSource={data.dateList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="region"
              label={strings.filter_region}
              dataSource={data.regionList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="with_hero_id"
              label={strings.filter_with_hero_id}
              dataSource={data.heroList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={5}
            />
            <FormField
              name="against_hero_id"
              label={strings.filter_against_hero_id}
              dataSource={data.heroList}
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
              dataSource={data.significantList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="having"
              label={strings.explorer_having}
              dataSource={data.gamesPlayedList}
              formSelectionState={formSelectionState}
              history={history}
              strict
              limit={1}
            />
            <FormField
              name="party_size"
              label={strings.filter_party_size}
              dataSource={data.partySize}
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

TableFilterForm.propTypes = {
  showForm: PropTypes.bool,
  currentQueryString: PropTypes.string,
  history: PropTypes.shape({}),
  playerId: PropTypes.string,
};

const mapStateToProps = state => ({
  showForm: state.app.form.show,
  currentQueryString: window.location.search,
});

const mapDispatchToProps = dispatch => ({
  toggleShowForm: () => dispatch(toggleShowForm()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableFilterForm));
