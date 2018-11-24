import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';
import Player from '../Player';
import Home from '../Home';
import Search from '../Search';
import Explorer from '../Explorer';
import Heroes from '../Heroes';
import Request from '../Request';
import Distributions from '../Distributions';
import Status from '../Status';
import Matches from '../Matches';
import Teams from '../Teams';
// import Assistant from '../Assistant';
import Records from '../Records';
import Scenarios from '../Scenarios';
import Predictions from '../Predictions';
import Meta from '../Meta';
import Api from '../Api';
import Footer from '../Footer';
import FourOhFour from '../FourOhFour';
import constants from '../constants';
import muiTheme from './muiTheme';
import GlobalStyle from './GlobalStyle';

const StyledDiv = styled.div`
  transition: ${constants.normalTransition};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: ${props => (props.open ? '256px' : '0px')};
  background-image: ${props => (props.location.pathname === '/' ? 'url("/assets/images/home-background.png")' : '')};
  background-position: ${props => (props.location.pathname === '/' ? 'center top' : '')};
  background-repeat: ${props => (props.location.pathname === '/' ? 'no-repeat' : '')};

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
    background-color: rgba(0,0,0,0.3);
    width: 40px;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    z-index: 999999;
    opacity: 0;
    display: block;
    pointer-events: none;
    -webkit-transform: translate3d(0,0,0);
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

class App extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setBack2TopRef = (node) => {
    this.back2Top = node;
  }

  handleScroll = () => {
    const { style } = this.back2Top;
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
      style.opacity = 1;
      style.pointerEvents = 'auto';
    } else {
      style.opacity = 0;
      style.pointerEvents = 'none';
    }
  }

  handleBack2TopClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    const {
      width, location, strings,
    } = this.props;

    const navbarPages = [
      <Link key="header_explorer" to="/explorer">{strings.header_explorer}</Link>,
      <Link key="header_meta" to="/meta">{strings.header_meta}</Link>,
      <Link key="header_matches" to="/matches">{strings.header_matches}</Link>,
      <Link key="header_teams" to="/teams">{strings.header_teams}</Link>,
      <Link key="header_heroes" to="/heroes">{strings.header_heroes}</Link>,
      <Link key="header_distributions" to="/distributions">{strings.header_distributions}</Link>,
      <Link key="header_records" to="/records">{strings.header_records}</Link>,
      <Link key="header_scenarios" to="/scenarios">{strings.header_scenarios}</Link>,
      <Link key="header_api" to="/api-keys">{strings.header_api}</Link>,
      // <Link key="header_predictions" to="/predictions">TI Predictions</Link>,
      // <Link key="header_assistant" to="/assistant">Assistant</Link>,
    ];

    const includeAds = !['/', '/api-keys'].includes(location.pathname);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <GlobalStyle />
        <StyledDiv {...this.props}>
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header location={location} navbarPages={navbarPages} />
          <AdBannerDiv>
            { includeAds &&
              <a href="http://www.vpgame.com/?lang=en_us">
                <img src="/assets/images/vp-banner.jpg" alt="" />
              </a>
            }
          </AdBannerDiv>
          <StyledBodyDiv {...this.props}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/matches/:matchId?/:info?" component={Matches} />
              <Route exact path="/players/:playerId/:info?/:subInfo?" component={Player} />
              <Route exact path="/heroes/:heroId?/:info?" component={Heroes} />
              <Route exact path="/teams/:teamId?/:info?" component={Teams} />
              <Route exact path="/distributions/:info?" component={Distributions} />
              <Route exact path="/request" component={Request} />
              <Route exact path="/status" component={Status} />
              <Route exact path="/explorer" component={Explorer} />
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
            { includeAds &&
              <div style={{ fontSize: '12px' }}>
                <a href="https://www.rivalry.gg/opendota">
                  <img src="/assets/images/rivalry-banner.gif" alt="" />
                </a>
                <div>
                  {strings.home_sponsored_by} <a href="https://www.rivalry.gg/opendota">Rivalry</a>
                </div>
              </div>
            }
          </AdBannerDiv>
          <Footer location={location} width={width} />
          <button ref={this.setBack2TopRef} id="back2Top" title={strings.back2Top} onClick={this.handleBack2TopClick}>
            <div>&#9650;</div>
            <div id="back2TopTxt">{strings.back2Top}</div>
          </button>
        </StyledDiv>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(App);
