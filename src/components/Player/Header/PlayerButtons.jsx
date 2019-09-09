import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/navigation/refresh';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { toggleShowForm as toggleShowFormAction } from '../../../actions/formActions';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 14px;

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

  render() {
    const { playerId, strings } = this.props;
    return (
      <Styled>
        <div data-hint={strings.app_refresh} data-hint-position="top">
          <FlatButton
            icon={<ActionUpdate />}
            disabled={this.state.disableRefresh}
            onClick={() => {
              fetch(
                `${process.env.REACT_APP_API_HOST}/api/players/${playerId}/refresh`,
                { method: 'POST' },
              );
              this.setState({ disableRefresh: true });
            }}
            label={strings.app_refresh_label}
          />
        </div>
        <FlatButton
          label={strings.app_gamerzclass}
          labelPosition="after"
          icon={
            <img src="/assets/images/gamerzclass-24px.png" alt="GamerzClass" />
          }
          href="https://gamerzclass.com/products/johan-n0tail-sundstein"
          target="_blank"
          onclick={() =>
            ReactGA.event({
              category: 'sponsor',
              action: 'gamerzclass',
              label: 'playerPage',
            })
          }
        />
      </Styled>
    );
  }
}

const mapStateToProps = state => ({
  showForm: state.app.form.show,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  toggleShowForm: () => dispatch(toggleShowFormAction('tableFilter')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerButtons);
