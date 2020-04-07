import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import { ExpandMore, ExpandLess, Translate } from '@material-ui/icons';
import styled from 'styled-components';
import { langs } from '../../lang/index';
import constants from '../constants';
import { useStrings } from '../../hooks/useStrings.hook';

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

const LocalizationMenu = React.forwardRef(() => {
  const strings = useStrings();
  const [open, setOpen] = React.useState(false);

  const handleOnClick = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!open);
    },
    [open, setOpen],
  );

  return (
    <div style={{ minWidth: '200px' }}>
      <StyledListItem button onClick={handleOnClick}>
        <StyledListItemIcon>
          <Translate />
        </StyledListItemIcon>
        <ListItemText primary={strings.app_language} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledListItem>
      <List component="div">
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          style={{ maxHeight: 300, overflow: 'auto' }}
        >
          <List component="div" disablePadding>
            {langs.map((lang) => (
              <StyledListItem
                button
                onClick={() => setLocalization(null, null, lang)}
                key={lang.value}
              >
                <ListItemText primary={lang.native} />
              </StyledListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
});

export default LocalizationMenu;
