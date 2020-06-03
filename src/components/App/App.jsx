import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Combos from './../Combos/Combos';
import Api from '../Api';
import constants from '../constants';
import Distributions from '../Distributions';
import Explorer from '../Explorer';
import Footer from '../Footer';
import FourOhFour from '../FourOhFour';
import Header from '../Header';
import Heroes from '../Heroes';
import Home from '../Home';
import Matches from '../Matches';
import Meta from '../Meta';
import Player from '../Player';
import Predictions from '../Predictions';
// import Assistant from "../Assistant";
import Records from '../Records';
import Request from '../Request';
import Scenarios from '../Scenarios';
import Search from '../Search';
import Status from '../Status';
import Teams from '../Teams';
import GlobalStyle from './GlobalStyle';
import muiTheme from './muiTheme';

const StyledDiv = styled.div`
  transition: ${constants.normalTransition};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: ${(props) => (props.open ? '256px' : '0px')};
  margin-top: 0px;
  background-image: ${(props) =>
    props.location.pathname === '/'
      ? 'url("/assets/images/home-background.png")'
      : ''};
  background-position: center top -56px;
  background-repeat: ${(props) =>
    props.location.pathname === '/' ? 'no-repeat' : ''};

  #back2Top {
    position: fixed;
    left: auto;
    right: 0px;
    top: auto;
    bottom: 20px;
    outline: none;
    color: rgb(196, 196, 196);
    text-align: center;
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    width: 40px;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    z-index: 999999;
    opacity: 0;
    display: block;
    pointer-events: none;
    -webkit-transform: translate3d(0, 0, 0);
    padding: 3px;
    transition: opacity 0.3s ease-in-out;

    & #back2TopTxt {
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      margin-bottom: 3px;
    }
  }

  #back2Top:hover {
    background-color: rgb(26, 108, 239);
  }
`;

const StyledBodyDiv = styled.div`
  padding: 25px;
  flex-grow: 1;

  @media only screen and (min-width: ${constants.appWidth}px) {
    width: ${constants.appWidth}px;
    margin: auto;
  }
`;

const AdBannerDiv = styled.div`
  text-align: center;
  margin-bottom: 5px;

  & img {
    margin-top: 10px;
    max-width: 100%;
  }
`;

const App = (props) => {
  const { strings, location } = props;

  const back2Top = React.useRef();

  React.useEffect(() => {
    const handleScroll = () => {
      let wait = false;
      const { current } = back2Top;
      if (!wait) {
        if (
          document.body.scrollTop > 1000 ||
          document.documentElement.scrollTop > 1000
        ) {
          current.style.opacity = 1;
          current.style.pointerEvents = 'auto';
        } else {
          current.style.opacity = 0;
          current.style.pointerEvents = 'none';
        }
      }
      setTimeout(() => {
        wait = !wait;
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const includeAds = !['/', '/api-keys'].includes(location.pathname);

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
      <GlobalStyle />
      <StyledDiv {...props}>
        <Helmet
          defaultTitle={strings.title_default}
          titleTemplate={strings.title_template}
        />
        <Header location={location} />
        <AdBannerDiv>
          {includeAds && (
            <a href="http://www.vpgame.com/?lang=en_us">
              <img src="/assets/images/vp-banner.jpg" alt="" />
            </a>
          )}
        </AdBannerDiv>
        <StyledBodyDiv {...props}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/matches/:matchId?/:info?" component={Matches} />
            <Route
              exact
              path="/players/:playerId/:info?/:subInfo?"
              component={Player}
            />
            <Route exact path="/heroes/:heroId?/:info?" component={Heroes} />
            <Route exact path="/teams/:teamId?/:info?" component={Teams} />
            <Route
              exact
              path="/distributions/:info?"
              component={Distributions}
            />
            <Route exact path="/request" component={Request} />
            <Route exact path="/status" component={Status} />
            <Route exact path="/explorer" component={Explorer} />
            <Route exact path="/combos" component={Combos} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/records/:info?" component={Records} />
            <Route exact path="/meta" component={Meta} />
            <Route exact path="/scenarios/:info?" component={Scenarios} />
            <Route exact path="/predictions" component={Predictions} />
            <Route exact path="/api-keys" component={Api} />
            <Route component={FourOhFour} />
          </Switch>
        </StyledBodyDiv>
        <AdBannerDiv>
          {includeAds && process.env.REACT_APP_ENABLE_RIVALRY && (
            <div style={{ fontSize: '12px' }}>
              <a href="https://www.rivalry.com/opendota">
                <img src="/assets/images/rivalry-banner.gif" alt="" />
              </a>
              <div>
                {strings.home_sponsored_by}{' '}
                <a href="https://www.rivalry.com/opendota">Rivalry</a>
              </div>
            </div>
          )}
          {
            includeAds && process.env.REACT_APP_ENABLE_BOTTOM_BANNER &&
            <>
              <script data-ad-client="ca-pub-5591574346816667" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
              <ins
                className="adsbygoogle"
                style={{display: "block"}}
                data-ad-client="ca-pub-5591574346816667"
                data-ad-slot="5235463836"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script>
                  (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </>
          }
        </AdBannerDiv>
        <Footer />
        <button
          ref={back2Top}
          id="back2Top"
          title={strings.back2Top}
          onClick={() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }}
        >
          <div>&#9650;</div>
          <div id="back2TopTxt">{strings.back2Top}</div>
        </button>
      </StyledDiv>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(withRouter(App));
