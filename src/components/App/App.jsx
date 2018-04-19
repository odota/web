import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Header from '../Header';
import Player from '../Player';
import Home from '../Home';
import Search from '../Search';
import Explorer from '../Explorer';
// import FourOhFour from '../FourOhFour';
import Heroes from '../Heroes';
import Request from '../Request';
import Distributions from '../Distributions';
import Status from '../Status';
import Matches from '../Matches';
import Teams from '../Teams';
// import Assistant from '../Assistant';
import Records from '../Records';
// import Predictions from '../Predictions';
import Meta from '../Meta';
import Api from '../Api';
import Footer from '../Footer';
import constants from '../constants';

const muiTheme = {
  fontFamily: constants.fontFamily,
  card: { fontWeight: constants.fontWeightNormal },
  badge: { fontWeight: constants.fontWeightNormal },
  subheader: { fontWeight: constants.fontWeightNormal },
  raisedButton: { fontWeight: constants.fontWeightNormal },
  flatButton: { fontWeight: constants.fontWeightNormal },
  inkBar: {
    backgroundColor: constants.colorBlue,
  },
  palette: {
    textColor: constants.textColorPrimary,
    primary1Color: constants.colorBlue,
    canvasColor: constants.primarySurfaceColor,
    borderColor: constants.dividerColor,
  },
  tabs: {
    backgroundColor: constants.primarySurfaceColor,
    textColor: constants.textColorPrimary,
    selectedTextColor: constants.textColorPrimary,
  },
  button: { height: 38 },
};

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
`;

const StyledBodyDiv = styled.div`
  padding: 25px;
  flex-grow: 1;

  @media only screen and (min-width: 1200px) {
    width: 1200px;
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
  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      window.scrollTo(0, 0);
    }
  }

  render() {
<<<<<<< HEAD
    const {
      params, width, location, strings,
    } = this.props;
=======
    const { params, width, location } = this.props;
    const includeAds = !['/', '/api-keys'].includes(location.pathname);
>>>>>>> a045ac9ba95d29f5cf7671de415b6775e7216606
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <StyledDiv {...this.props}>
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header params={params} location={location} />
          <AdBannerDiv>
            { includeAds &&
              <a href="http://www.vpgame.com/?lang=en_us">
                <img src="/assets/images/vp-banner.jpg" alt="" />
              </a>
            }
          </AdBannerDiv>
          <StyledBodyDiv {...this.props}>
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
            <Route exact path="/api-keys" component={Api} />
          </StyledBodyDiv>
          <AdBannerDiv>
            { includeAds &&
              <div style={{ fontSize: '12px' }}>
                <a href="https://glhf.rivalry.gg/get-started-dota/?utm_source=opendota&utm_medium=link&utm_campaign=opendota">
                  <img src="/assets/images/rivalry-banner.png" alt="" />
                </a>
                <div>
                  {strings.home_sponsored_by} <a href="https://www.rivalry.gg">Rivalry</a>
                </div>
              </div>
            }
          </AdBannerDiv>
          <Footer location={location} width={width} />
        </StyledDiv>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  params: PropTypes.shape({}),
  width: PropTypes.number,
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(App);
