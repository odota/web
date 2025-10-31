import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { Suspense } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Combos from '../Combos/Combos';
import Api from '../Api/Api';
import Subscription from '../Subscription/Subscription';
import constants from '../constants';
import Distributions from '../Distributions';
import Footer from '../Footer/Footer';
import FourOhFour from '../FourOhFour/FourOhFour';
import Header from '../Header/Header';
import Home from '../Home';
import Matches from '../Matches';
import Player from '../Player';
import Records from '../Records';
import Request from '../Request/Request';
import Scenarios from '../Scenarios/Scenarios';
import Search from '../Search/Search';
import Teams from '../Teams';
import config from '../../config';
import Spinner from '../Spinner/Spinner';
import Players from '../Players/Players';
import Heroes from '../Heroes';
import useStrings from '../../hooks/useStrings.hook';

const Status = React.lazy(() => import('../Status/Status'));
const Explorer = React.lazy(() => import('../Explorer'));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

type AppStylesProps = {
  open?: boolean;
  location?: {
    pathname?: string;
  };
};

type Back2TopStylesProps = {
  open?: boolean;
  location?: {
    pathname: string;
  };
};

type AppProps = {
  location?: any;
};

const StyledDiv = styled.div<AppStylesProps>`
  transition: ${constants.normalTransition};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: ${(props) => (props.open ? '256px' : '0px')};
  margin-top: 0px;

  background-image: ${(props) =>
    props.location?.pathname === '/'
      ? `url("/assets/images/home-background.png")`
      : ''};
  background-position: center top -8px;
  background-repeat: ${(props) =>
    props.location?.pathname === '/' ? 'no-repeat' : ''};
`;

const Back2Top = styled.button<Back2TopStylesProps>`
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

  &:hover {
    background-color: rgb(26, 108, 239);
  }

  #back2TopTxt {
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    margin-bottom: 3px;
  }
`;

const StyledBodyDiv = styled.div`
  flex-grow: 1;
`;

const AdBannerDiv = styled.div`
  text-align: center;
  margin-bottom: 5px;

  img {
    margin-top: 10px;
    max-width: 100%;
  }
`;

declare let window: Window & { adsbygoogle: any };

const App = (props: AppProps) => {
  const strings = useStrings();
  const { location } = props;

  const back2Top = React.useRef<HTMLButtonElement>();

  React.useEffect(() => {
    const handleScroll = () => {
      let wait = false;
      const { current } = back2Top;

      if (!wait && current) {
        if (
          document.body.scrollTop > 1000 ||
          document.documentElement.scrollTop > 1000
        ) {
          current.style.opacity = '1';
          current.style.pointerEvents = 'auto';
        } else {
          current.style.opacity = '0';
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

  const includeAds = !['/', '/api-keys', '/status'].includes(location.pathname);

  return (
    <ThemeProvider theme={darkTheme}>
      <Suspense fallback={<Spinner />}>
        <div
          {...props}
          className="transition-all duration-300 relative flex flex-col h-full"
        >
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header location={location} />
          <StyledBodyDiv {...props}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/matches/:matchId?/:info?"
                component={Matches}
              />
              <Route
                exact
                path="/players/:playerId/:info?/:subInfo?"
                component={Player}
              />
              <Route exact path="/heroes/:heroId?/:info?" component={Heroes} />
              <Route exact path="/teams/:teamId?/:info?" component={Teams} />
              <Route exact path="/players" component={Players} />
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
              {/* <Route exact path="/meta" component={Meta} /> */}
              <Route exact path="/scenarios/:info?" component={Scenarios} />
              {/* <Route exact path="/predictions" component={Predictions} /> */}
              <Route exact path="/api-keys" component={Api} />
              <Route exact path="/subscribe" component={Subscription} />
              <Route component={FourOhFour} />
            </Switch>
          </StyledBodyDiv>
          <AdBannerDiv>
            {includeAds && config.VITE_ENABLE_RIVALRY && (
              <div style={{ fontSize: '12px' }}>
                <a href="https://www.rivalry.com/opendota">
                  <img
                    src="/assets/images/rivalry-banner.gif"
                    alt="Logo for Rivalry.com"
                  />
                </a>
                <div>
                  {strings.home_sponsored_by}{' '}
                  <a href="https://www.rivalry.com/opendota">Rivalry</a>
                </div>
              </div>
            )}
          </AdBannerDiv>
          <Footer />
          <Back2Top
            //@ts-expect-error
            ref={back2Top} // type 'undefined' is not assignable to type 'HTMLButtonElement | null'
            id="back2Top"
            title={strings.back2Top}
            onClick={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            <div>&#9650;</div>
            <div id="back2TopTxt">{strings.back2Top}</div>
          </Back2Top>
        </div>
      </Suspense>
    </ThemeProvider>
  );
};

export default withRouter(App);
