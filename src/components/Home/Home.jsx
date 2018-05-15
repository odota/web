import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Buttons from './Buttons';
import Why from './Why';
import Sponsors from './Sponsors';
import { HeadContainerDiv, HeadlineDiv, DescriptionDiv, BottomTextDiv } from './Styled';

const Home = ({ strings }) => (
  <div>
    <HeadContainerDiv>
      <HeadlineDiv>
        {strings.app_name}
      </HeadlineDiv>
      <DescriptionDiv>
        {strings.app_description}
      </DescriptionDiv>
      <Buttons />
    </HeadContainerDiv>
    <Why />
    <Sponsors />
    <BottomTextDiv>
      {strings.home_background_by}
      <a href="//www.artstation.com/artist/mikeazevedo" target="_blank" rel="noopener noreferrer"> Mike Azevedo</a>
    </BottomTextDiv>
  </div>
);

Home.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  content: state.content,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Home);
