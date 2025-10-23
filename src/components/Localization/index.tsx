import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Translate from '@mui/icons-material/Translate';
import styled from 'styled-components';
import { langs } from '../../lang';
import constants from '../constants';
import { useStrings } from '../../hooks/useStrings.hook';

const StyledListItem = styled(ListItem)`
  color: ${constants.primaryTextColor} !important;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: ${constants.primaryTextColor} !important;
`;

const setLocalization = (event: any, key: string | null, payload: { value: any }) => {
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
      <StyledListItem onClick={handleOnClick}>
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
