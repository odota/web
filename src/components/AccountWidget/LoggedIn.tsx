import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import Spinner from '../Spinner';
import useStrings from '../../hooks/useStrings.hook';

const StyledFlatButton = styled(FlatButton)`
 min-width: 30px !important;
 & > div > span {
   display: inline-block;
   max-width: 90px;
   overflow: hidden;
   text-overflow: ellipsis;
   text-transform: none !important;
   white-space: nowrap;
   font-size: 16px !important;
   padding-right: 10px !important;
   padding-left: 0 !important;
 }
 display: flex;
`;

const LoggedIn = ({ playerId, style }: { playerId: number, style: any }) => {
  const strings = useStrings();
  if (!playerId) {
    return <Spinner color="#fff" size={0.5} />;
  }
  return (
    <Link style={style} to={`/players/${playerId}`}>
      <StyledFlatButton
        label={strings.app_my_profile}
        hoverColor="transparent"
      />
    </Link>
  );
};

export default LoggedIn;
