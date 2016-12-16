/* global API_HOST */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import strings from 'lang';
import { player } from 'reducers';
import Localization from 'components/Localization';
import Spinner from '../Spinner';
import Error from '../Error';
import styles from './AccountWidget.css';
import { IconLogout } from '../Icons';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    const { Button, buttonProps, children } = this.props;
    return (
      <div>
        <Button onTouchTap={this.handleTouchTap} {...buttonProps} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {React.Children.map(children, child => (
              <MenuItem>
                {child}
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      </div>
    );
  }
}

const LoggedIn = ({ loading, error, playerId, playerName, playerPicture }) => {
  const getPlayerWidget = () => {
    if (error) return <Error />;
    if (loading) return <Spinner color="#fff" size={0.5} />;
    const buttonProps = {
      label: playerName,
      labelPosition: 'before',
      className: styles.account,
      hoverColor: 'transparent',
      icon: <Avatar src={playerPicture} size={30} />,
    };
    return (
      <div className={styles.group}>
        <Dropdown
          Button={FlatButton}
          buttonProps={buttonProps}
        >
          <Link to={`/players/${playerId}`}>
            Profile
          </Link>
          <Localization />
        </Dropdown>
        <IconButton
          href={`${API_HOST}/logout`}
          data-hint={strings.app_logout}
          data-hint-position="bottom"
          style={{ zIndex: 3200 }}
          className={styles.iconButton}
        >
          <IconLogout />
        </IconButton>
      </div>
    );
  };

  return getPlayerWidget();
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  playerName: player.getPlayerName(state, ownProps.playerId),
  playerPicture: player.getPicture(state, ownProps.playerId),
  playerId: ownProps.playerId,
});

export default connect(mapStateToProps)(LoggedIn);
