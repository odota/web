import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import strings from 'lang';
import { Route } from 'react-router-dom';
import Player from 'components/Player';
import Home from 'components/Home';
import Search from 'components/Search';
import Explorer from 'components/Explorer';
// import FourOhFour from 'components/FourOhFour';
import Heroes from 'components/Heroes';
import Request from 'components/Request';
import Distributions from 'components/Distributions';
import Status from 'components/Status';
import Matches from 'components/Matches';
import Teams from 'components/Teams';
// import Assistant from 'components/Assistant';
import Records from 'components/Records';
// import Predictions from 'components/Predictions';
import Combos from 'components/Explorer/Combos';
import Meta from 'components/Meta';
import styled from 'styled-components';
import Header from '../Header';
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

class App extends React.Component {
  componentWillUpdate(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { params, width, location } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <StyledDiv {...this.props}>
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header params={params} location={location} />
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
            <Route exact path="/combos" component={Combos} />
            <Route exact path="/meta" component={Meta} />
          </StyledBodyDiv>
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
};

export default connect()(App);
