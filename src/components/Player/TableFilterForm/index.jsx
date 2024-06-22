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
import constants from '../../constants';
import config from '../../../config';

const textFieldStyle = { width: 53, fontSize: 9, height: 'auto' };

const Styled = styled.div`
  .formGroup {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: -3px;

    > div {
      width: 60px;

      &:not(:last-child) {
        margin-right: 15px;
      }
    }

    /* Override material-ui */
    > div > div > div {
      width: 60px !important;
    }

    label {
      white-space: nowrap !important;
      line-height: 12px !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      width: 100% !important;
      top: auto !important;
      bottom: 10px !important;
      letter-spacing: 0.1px !important;
      font-size: 11px !important;
      color: rgba(255, 255, 255, 0.48) !important;
    }

    input {
      height: 20px !important;
      margin-top: 0px !important;
      vertical-align: super !important;
    }

    hr:first-child {
      border-color: rgba(255, 255, 255, 0.3) !important;
      border-bottom-style: dashed !important;
    }

    .chip {
      padding-left: 1px;
      > div {
        border-radius: 0px !important;
        width: 70px !important;
        margin: 0px !important;
        background-color: transparent !important;
        > span {
          font-size: 11px !important;
          letter-spacing: 1px;
          padding-left: 0px !important;
          padding-right: 1px !important;
          line-height: 12px !important;
          overflow: hidden !important;
          width: 50px !important;
          text-overflow: ellipsis !important;
        }
        > svg {
          position: relative !important;
          bottom: 5px !important;
          margin: 0px !important;
          fill: rgb(71, 71, 86) !important;
          flex-grow: 0 !important;
          flex-shrink: 0 !important;

          &:hover {
            fill: white !important;
          }
        }
      }
    }
  }

  .hideForm {
    overflow: hidden;
    max-height: 0px;
  }

  .showForm {
    border: 1px solid rgb(0, 0, 0, 0.12);
    background-color: rgba(20, 20, 21, 0.32);
    padding-left: 5px;
    padding-right: 5px;
    position: relative;
    margin-top: 35px;

    ::after {
      position: absolute;
      content: '${(props) => props.strings.filter_button_text_open}';
      font-size: 12px;
      top: -15px;
      left: 0px;
      line-height: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      backface-visibility: hidden;
      color: ${constants.colorMuted};
    }
  }
`;

const getPeers = (props, context) => {
  fetch(`${config.VITE_API_HOST}/api/players/${props.playerId}/peers`)
    .then((resp) => resp.json())
    .then((json) => context.setState({ peers: json }));
};

const setShowFormState = (props) => {
  if (Boolean(props.currentQueryString.substring(1)) !== props.showForm) {
    // If query string state has a filter, turn on the form
    props.toggleShowForm();
  }
};

class TableFilterForm extends React.Component {
  static propTypes = {
    currentQueryString: PropTypes.string,
    history: PropTypes.shape({}),
    playerId: PropTypes.string,
    strings: PropTypes.shape({}),
  };

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
    const { currentQueryString, history, strings } = this.props;
    const formSelectionState = querystring.parse(
      currentQueryString.substring(1)
    );

    const heroList = Object.keys(heroes)
      .map((id) => ({
        text: heroes[id] && heroes[id].localized_name,
        value: id,
      }))
      .sort((a, b) => a.text && a.text.localeCompare(b.text));

    const laneList = Object.keys(strings)
      .filter((str) => str.indexOf('lane_role_') === 0)
      .map((str) => str.substring('lane_role_'.length))
      .map((id) => ({
        text: strings[`lane_role_${id}`],
        value: Number(id),
      }));

    const patchList = patch
      .map((_patch, index) => ({
        text: _patch.name,
        value: index,
      }))
      .reverse();

    const modeList = Object.keys(strings)
      .filter((str) => str.indexOf('game_mode_') === 0)
      .map((str) => str.substring('game_mode_'.length))
      .map((id) => ({
        text: strings[`game_mode_${id}`],
        value: id,
      }));

    const lobbyTypeList = Object.keys(strings)
      .filter((str) => str.indexOf('lobby_type_') === 0)
      .map((str) => str.substring('lobby_type_'.length))
      .map((id) => ({
        text: strings[`lobby_type_${id}`],
        value: id,
      }));

    const regionList = Object.keys(region).map((id) => ({
      text: strings[`region_${id}`],
      value: Number(id),
    }));

    const factionList = [
      {
        text: strings.general_radiant,
        value: 1,
      },
      {
        text: strings.general_dire,
        value: 0,
      },
    ];

    const resultList = [
      {
        text: strings.td_win,
        value: 1,
      },
      {
        text: strings.td_loss,
        value: 0,
      },
    ];

    const dateList = [
      {
        text: strings.filter_last_week,
        value: 7,
      },
      {
        text: strings.filter_last_month,
        value: 30,
      },
      {
        text: strings.filter_last_3_months,
        value: 90,
      },
      {
        text: strings.filter_last_6_months,
        value: 180,
      },
      {
        text: strings.filter_last_12_months,
        value: 360,
      },
    ];

    const significantList = [
      {
        text: strings.filter_significant_include,
        value: 0,
      },
    ];

    const gamesPlayedList = [
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: '15',
        value: 15,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '25',
        value: 25,
      },
    ];

    const partySize = [
      {
        text: '1',
        value: 1,
      },
      {
        text: '2',
        value: 2,
      },
      {
        text: '3',
        value: 3,
      },
      {
        text: '4',
        value: 4,
      },
      {
        text: '5',
        value: 5,
      },
    ];

    const roleList = [
      {
        text: 'Carry',
        value: 1,
      },
      {
        text: 'Nuker',
        value: 2,
      },
      {
        text: 'Initiator',
        value: 3,
      },
      {
        text: 'Disabler',
        value: 4,
      },
      {
        text: 'Durable',
        value: 5,
      },
      {
        text: 'Escape',
        value: 6,
      },
      {
        text: 'Support',
        value: 7,
      },
      {
        text: 'Pusher',
        value: 8,
      },
      {
        text: 'Jungler',
        value: 9,
      },
    ];

    const CustomFormField = (props) => (
      <FormField
        formSelectionState={formSelectionState}
        history={history}
        textFieldStyle={textFieldStyle}
        {...props}
      />
    );

    const isFilterApplied = Object.keys(formSelectionState).length > 0;

    return (
      <Styled strings={strings}>
        <div
          className="showForm"
          style={{
            borderColor: isFilterApplied && 'rgba(45,210,106,0.27)',
            backgroundColor: isFilterApplied && 'rgba(31, 31, 33, 0.85)',
          }}
        >
          <div className="formGroup">
            <CustomFormField
              name="hero_id"
              label={strings.filter_hero_id}
              dataSource={heroList}
              strict
              limit={1}
            />
            <CustomFormField
              name="is_radiant"
              label={strings.filter_is_radiant}
              dataSource={factionList}
              strict
              limit={1}
            />
            <CustomFormField
              name="win"
              label={strings.filter_win}
              dataSource={resultList}
              strict
              limit={1}
            />
{/*             <CustomFormField
              name="role_id"
              label={strings.heading_lane_role}
              dataSource={roleList}
              strict
              limit={1}
            /> */}
            <CustomFormField
              name="lane_role"
              label={strings.filter_lane_role}
              dataSource={laneList}
              strict
              limit={1}
            />
            <CustomFormField
              name="patch"
              label={strings.filter_patch}
              dataSource={patchList}
              strict
              limit={1}
            />
            <CustomFormField
              name="game_mode"
              label={strings.filter_game_mode}
              dataSource={modeList}
              strict
              limit={1}
            />
            <CustomFormField
              name="lobby_type"
              label={strings.filter_lobby_type}
              dataSource={lobbyTypeList}
              strict
              limit={1}
            />
            <CustomFormField
              name="date"
              label={strings.filter_date}
              dataSource={dateList}
              strict
              limit={1}
            />
            <CustomFormField
              name="region"
              label={strings.filter_region}
              dataSource={regionList}
              strict
              limit={1}
            />
            <CustomFormField
              name="with_hero_id"
              label={strings.filter_with_hero_id}
              dataSource={heroList}
              strict
              limit={5}
            />
            <CustomFormField
              name="against_hero_id"
              label={strings.filter_against_hero_id}
              dataSource={heroList}
              strict
              limit={5}
            />
            <CustomFormField
              name="included_account_id"
              label={strings.filter_included_account_id}
              dataSource={this.state.peers.map((peer) => ({
                text: `${peer.personaname}`,
                value: peer.account_id,
              }))}
              limit={10}
            />
            <CustomFormField
              name="excluded_account_id"
              label={strings.filter_excluded_account_id}
              dataSource={this.state.peers.map((peer) => ({
                text: `${peer.personaname}`,
                value: peer.account_id,
              }))}
            />
            <CustomFormField
              name="significant"
              label={strings.filter_significant}
              dataSource={significantList}
              strict
              limit={1}
            />
            <CustomFormField
              name="having"
              label={strings.explorer_having}
              dataSource={gamesPlayedList}
              strict
              limit={1}
            />
            <CustomFormField
              name="party_size"
              label={strings.filter_party_size}
              dataSource={partySize}
              strict
              limit={1}
            />
          </div>
        </div>
      </Styled>
    );
  }
}

const mapStateToProps = (state) => ({
  showForm: state.app.form.show,
  currentQueryString: window.location.search,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowForm: () => dispatch(toggleShowForm()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableFilterForm)
);
