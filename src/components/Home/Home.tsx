import React from 'react';
import { connect } from 'react-redux';
import Buttons from './Buttons';
import Why from './Why';
import Sponsors from './Sponsors';
import { HeadContainerDiv, HeadlineDiv, DescriptionDiv, BottomTextDiv } from './Styled';

export interface HomePageProps {
  user?: string;
  strings: { [key: string]: string };
}

const Home = ({ strings }: HomePageProps) => (
  <div>
    <HeadContainerDiv>
      <HeadlineDiv>
        <h1>{strings.app_name}</h1>
      </HeadlineDiv>
      <DescriptionDiv>
        <h2>{strings.app_description}</h2>
      </DescriptionDiv>
      <Buttons strings={strings} />
    </HeadContainerDiv>
    <Why />
    <Sponsors />
    <BottomTextDiv>
      <span id="bg-image-description">{strings.home_background_by}</span>
      <a
        href="//www.artstation.com/artist/mikeazevedo"
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="bg-image-description"
        aria-label="Mike Azevedo on artstation.com"
      > Mike Azevedo
      </a>
    </BottomTextDiv>
  </div>
);

const mapStateToProps = (state: any) => ({
  content: state.content,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Home);
