import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import palette from 'components/palette.css';
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
import Header from '../Header';
import Footer from '../Footer';
import styles from './App.css';

const muiTheme = {
  fontFamily: palette.fontFamily,
  card: { fontWeight: palette.fontWeightNormal },
  badge: { fontWeight: palette.fontWeightNormal },
  subheader: { fontWeight: palette.fontWeightNormal },
  raisedButton: { fontWeight: palette.fontWeightNormal },
  flatButton: { fontWeight: palette.fontWeightNormal }, // color: 'background color'
  inkBar: {
    backgroundColor: palette.blue,
  },
  palette: {
    textColor: palette.textColorPrimary,
    primary1Color: palette.blue,
    canvasColor: palette.primarySurfaceColor,
    borderColor: palette.dividerColor,
  },
  tabs: {
    backgroundColor: palette.primarySurfaceColor,
    textColor: palette.textColorPrimary,
    selectedTextColor: palette.textColorPrimary,
  },
  button: { height: 38 },
};

class App extends React.Component {
  componentWillUpdate(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { open, params, width, location } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <div
          className={
        `${open ? styles.drawerOpen : styles.drawerClosed}
        ${styles.container}
        ${location.pathname === '/' && styles.HomeBackground}`
      }
        >
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header params={params} location={location} />
          <div className={styles.body}>
            <Route exact path="/" component={Home} />
            <Route exact path="/matches/:matchId?/:info?" component={Matches} />
            <Route exact path="/players/:playerId/:info?/:subInfo?" component={Player} />
            <Route exact path="/heroes/:heroId?/:info?" component={Heroes} />
            <Route exact path="/teams" component={Teams} />
            <Route exact path="/distributions/:info?" component={Distributions} />
            <Route exact path="/request" component={Request} />
            <Route exact path="/status" component={Status} />
            <Route exact path="/explorer" component={Explorer} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/records/:info?" component={Records} />
          </div>
          <Footer location={location} width={width} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
