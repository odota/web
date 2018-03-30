import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import strings from 'lang';
import { IconSteam } from '../components/Icons';
import { ButtonsDiv } from './Styled';

const Buttons = ({ user }) => (
  <ButtonsDiv>
    {
      !user &&
      <div>
        <FlatButton
          label={<span className="label"><b>{strings.home_login}</b> {strings.home_login_desc}</span>}
          icon={<IconSteam />}
          href={`${process.env.REACT_APP_API_HOST}/login`}
        />
      </div>
    }
    <div className="bottomButtons">
      <div>
        <FlatButton
          label={<span className="label"><b>{strings.home_parse}</b> {strings.home_parse_desc}</span>}
          containerElement={<Link to="/request">{strings.home_parse}</Link>}
        />
      </div>
    </div>
  </ButtonsDiv>
);

Buttons.propTypes = {
  user: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const { data } = state.app.metadata;
  return {
    user: data.user,
  };
};

export default connect(mapStateToProps, null)(Buttons);
