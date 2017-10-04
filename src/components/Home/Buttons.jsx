/* global API_HOST */
import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import strings from 'lang';
import { IconSteam } from 'components/Icons';
import { ButtonsDiv } from './Styled';

export default () => (
  <ButtonsDiv>
    <div>
      <FlatButton
        label={<span className="label"><b>{strings.home_login}</b> {strings.home_login_desc}</span>}
        icon={<IconSteam />}
        href={`${API_HOST}/login`}
      />
    </div>
    <div className="bottomButtons">
      <div>
        <FlatButton
          label={<span className="label"><b>{strings.home_parse}</b> {strings.home_parse_desc}</span>}
          containerElement={<Link to="/request">{strings.home_parse}</Link>}
        />
      </div>
      <div>
        <FlatButton
          icon={<img
            src="/assets/images/jist-white-logo.png"
            alt=""
            style={{ width: 75, verticalAlign: 'middle' }}
          />}
          label={<span className="label">{strings.home_jist_button}</span>}
          href="https://www.jist.tv/create.php?opendota-welcome=1"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  </ButtonsDiv>
);
