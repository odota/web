import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/navigation/refresh';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Box } from '@material-ui/core';

import { toggleShowForm as toggleShowFormAction } from '../../../actions/formActions';
import GamemodeToggle from '../../../components/GamemodeToggle';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 14px;
  margin-top: 8px;

  @media only screen and (max-width: 660px) {
    justify-content: center;

    & a {
      min-width: 50px !important;
    }

    & button {
      min-width: 50px !important;
    }

    & * {
      font-size: 0 !important;
      padding: 0 !important;
      margin: auto !important;
    }

    & span {
      margin: 0 !important;
    }
  }
`;
class PlayerButtons extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    strings: PropTypes.shape({}),
  };

  state = { disableRefresh: false };

  refresh() {
    const { playerId } = this.props;
    fetch(`${process.env.REACT_APP_API_HOST}/api/players/${playerId}/refresh`, {
      method: 'POST',
    });
    this.setState({ disableRefresh: true });
  }

  render() {
    const { strings } = this.props;

    return (
      <Styled>
        <div data-hint={strings.app_refresh} data-hint-position="top">
          <FlatButton
            icon={<ActionUpdate />}
            disabled={this.state.disableRefresh}
            onClick={this.refresh}
            label={strings.app_refresh_label}
          />
        </div>
        <Box ml="16px">
          <GamemodeToggle />
        </Box>
      </Styled>
    );
  }
}

const mapStateToProps = (state) => ({
  showForm: state.app.form.show,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowForm: () => dispatch(toggleShowFormAction('tableFilter')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerButtons);
