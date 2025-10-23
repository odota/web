import React from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import { IconSteam } from '../Icons';
import config from '../../config';

import { HomePageProps } from './Home';

const Buttons = ({ user, strings }: HomePageProps) => (
  <div>
    {!user && (
      <div>
        <Button
          variant="contained"
          startIcon={<IconSteam />}
          href={`${config.VITE_API_HOST}/login`}
        >
          {strings.home_login}
        </Button>
      </div>
    )}
  </div>
);

const mapStateToProps = (state: any) => {
  const { data } = state.app.metadata;
  return {
    user: data.user,
    strings: state.app.strings,
  };
};

export default connect(mapStateToProps, null)(Buttons);
