import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List, ListItem, ListItemIcon, ListItemText, Collapse,
} from '@material-ui/core';
import { ExpandMore, ExpandLess, Translate } from '@material-ui/icons';
import styled from 'styled-components';
import { langs } from '../../lang/index';
import constants from '../constants';

const StyledListItem = styled(ListItem)`
  color: ${constants.primaryTextColor} !important;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: ${constants.primaryTextColor} !important;
`;

const setLocalization = (event, key, payload) => {
  window.localStorage.setItem('localization', payload.value);
  window.location.reload();
};

class LocalizationMenuItems extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOnClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { strings } = this.props;
    const { open } = this.state;
    return (
      <div style={{ minWidth: '200px' }}>
        <List component="div">
          <StyledListItem button onClick={this.handleOnClick}>
            <StyledListItemIcon>
              <Translate />
            </StyledListItemIcon>
            <ListItemText primary={strings.app_language} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </StyledListItem>
          <Collapse in={open} timeout="auto" unmountOnExit style={{ maxHeight: 300, overflow: 'auto' }}>
            <List component="div" disablePadding>
              {langs.map((lang) => (
                <StyledListItem button onClick={() => setLocalization(null, null, lang)} key={lang.translated}>
                  <ListItemText primary={lang.native} />
                </StyledListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  strings: state.app.strings,
});

LocalizationMenuItems.propTypes = {
  strings: PropTypes.shape({}),
};

export default connect(mapStateToProps, null)(LocalizationMenuItems);
