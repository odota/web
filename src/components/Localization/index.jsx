import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
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

const LocalizationMenuItems = ({ strings }) => {
  const [open, setOpen] = React.useState(false);

  const handleOnClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <div style={{ minWidth: '200px' }}>
      <List component="div">
        <StyledListItem button onClick={handleOnClick}>
          <StyledListItemIcon>
            <Translate />
          </StyledListItemIcon>
          <ListItemText primary={strings.app_language} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </StyledListItem>
        <Collapse in={open} timeout="auto" unmountOnExit style={{ maxHeight: 300, overflow: 'auto' }}>
          <List component="div" disablePadding>
            {langs.map(lang => (
              <StyledListItem button onClick={() => setLocalization(null, null, lang)} key={lang.native}>
                <ListItemText primary={lang.native} />
              </StyledListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

LocalizationMenuItems.propTypes = {
  strings: PropTypes.shape({}),
};

export default connect(mapStateToProps, null)(LocalizationMenuItems);
