/* global Notification */
import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
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
import Scenarios from '../Scenarios';
// import Predictions from '../Predictions';
import Meta from '../Meta';
import Api from '../Api';
import Footer from '../Footer';
import constants from '../constants';
import FourOhFour from '../../components/FourOhFour';
import { heroSelector } from '../../reducers/selectors';

const path = '/notifications';

firebase.initializeApp({
  messagingSenderId: '94888484309',
});

const messaging = firebase.messaging();

function getMessagingToken() {
  messaging.getToken()
    .then((token) => {
      if (token) {
        fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error();
            }
          })
          .catch(err => console.log(err));
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}

messaging.onTokenRefresh(getMessagingToken);

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);

  if (payload.data.type === 'MATCH') {
    const n = new Notification(
      'Parsed $match'.replace('$match', payload.data.match_id),
      {
        body: 'Check out your performance.',
      },
    );
    n.onclick = (event) => {
      console.log(event);
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open(`https://opendota.com/matches/${payload.data.match_id}`, '_blank');
    };
  }
});

getMessagingToken();

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
    backgroundColor: 'transparent',
    textColor: constants.colorMuted,
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

const Prompt = styled.div`
  position: fixed;
  right: 5px;
  bottom: 5px;
  background: black;
  width: 250px;
  z-index: 100;
  padding: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.4);
`;

class App extends React.Component {
  static propTypes = {
    params: PropTypes.shape({}),
    width: PropTypes.number,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
    user: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);


    this.state = {
      canNotify: 'Notification' in window && Notification.permission,
      showLoginPrompt: true,
    };

    this.askForNotifiyPermission = this.askForNotifiyPermission.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      window.scrollTo(0, 0);
    }
  }

  askForNotifiyPermission(strings) {
    Notification.requestPermission()
      .then((permission) => {
        this.setState({ canNotify: permission });
        if (permission === 'granted') {
          new Notification(`${strings.notify_granted_title}!`, { // eslint-disable-line no-new
            body: strings.notify_granted_body,
          });
          getMessagingToken();
        }
      });
  }

  render() {
    const {
      params, width, location, strings, user, heroes
    } = this.props;
    const includeAds = !['/', '/api-keys'].includes(location.pathname);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <StyledDiv {...this.props}>
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header params={params} location={location} />
          {
            user && this.state.canNotify !== false && !['denied', 'granted'].includes(this.state.canNotify) ?
              <Prompt>
                <img src="/assets/images/icons/icon-72x72.png" alt="logo" style={{ height: '25px', margin: '0 5px' }} />
                <h3 style={{ display: 'inline-block', margin: '0' }}>Get Notified</h3>
                <p>Enable automatic notfications for whenever a match is parsed.</p>
                <RaisedButton
                  primary
                  label="Enable"
                  labelPosition="after"
                  onClick={() => this.askForNotifiyPermission(strings)}
                  style={{ margin: '5px 5px' }}
                />
                <FlatButton
                  label="Dismiss"
                  labelPosition="after"
                  onClick={() => this.setState({canNotify: false})}
                  style={{ margin: '5px 5px' }}
                />
              </Prompt>
            : <div />
          }
          {
            !user && this.state.showLoginPrompt ?
              <Prompt>
                <img src="/assets/images/icons/icon-72x72.png" alt="logo" style={{ height: '25px', margin: '0 5px' }} />
                <h3 style={{ display: 'inline-block', margin: '0' }}>Get Tracked</h3>
                <p>Log in to get your matches automatically parsed. All for free.</p>
                <RaisedButton
                  primary
                  label={strings.app_login}
                  labelPosition="after"
                  href={`${process.env.REACT_APP_API_HOST}/login`}
                  style={{ margin: '5px 5px' }}
                />
                <FlatButton
                  label="Dismiss"
                  labelPosition="after"
                  onClick={() => this.setState({ showLoginPrompt: false })}
                  style={{ margin: '5px 5px' }}
                />
              </Prompt>
            : <div />
          }
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
              <Route exact path="/api-keys" component={Api} />
              <Route component={FourOhFour} />
            </Switch>
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

const mapStateToProps = state => ({
  strings: state.app.strings,
  user: state.app.metadata.data.user,
  heroes: state.app.heroStats.data,
});

export default connect(mapStateToProps)(App);
