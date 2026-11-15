import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { Suspense } from "react";
import Helmet from "react-helmet";
import { Route, Switch, withRouter } from "react-router-dom";

import Combos from "../Combos/Combos";
import Api from "../Api/Api";
import Subscription from "../Subscription/Subscription";
import constants from "../constants";
import Distributions from "../Distributions/Distributions";
import Footer from "../Footer/Footer";
import FourOhFour from "../FourOhFour/FourOhFour";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Matches from "../Matches/Matches";
import Player from "../Player/Player";
import Records from "../Records/Records";
import Request from "../Request/Request";
import Scenarios from "../Scenarios/Scenarios";
import Search from "../Search/Search";
import Teams from "../Teams/Teams";
import config from "../../config";
import Spinner from "../Spinner/Spinner";
import Players from "../Players/Players";
import Heroes from "../Heroes/Heroes";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./App.module.css";

const Esports = React.lazy(() => import("../Esports/Esports"));
const Status = React.lazy(() => import("../Status/Status"));
const Explorer = React.lazy(() => import("../Explorer/Explorer"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          display: "flex-inline",
          alignItems: "center",
          textTransform: "none",
          fontFamily: constants.fontFamilyFuturistic,
          fontSize: constants.fontSizeSmall,
          fontWeight: 300,
          "&:hover": {
            backgroundColor: "transparent",
            filter: "brightness(0.85)",
          },
        },
        startIcon: {
          marginRight: 2,
          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        },
      },
    },
  },
});

type AppProps = {
  location?: any;
  open?: boolean;
};

declare let window: Window & { adsbygoogle: any };

const App = (props: AppProps) => {
  const strings = useStrings();
  const { location, open } = props;

  const back2Top = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      let wait = false;
      const { current } = back2Top;

      if (!wait && current) {
        if (
          document.body.scrollTop > 1000 ||
          document.documentElement.scrollTop > 1000
        ) {
          current.style.opacity = "1";
          current.style.pointerEvents = "auto";
        } else {
          current.style.opacity = "0";
          current.style.pointerEvents = "none";
        }
      }
      setTimeout(() => {
        wait = !wait;
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const includeAds = !["/", "/api-keys", "/status"].includes(location.pathname);

  return (
    <ThemeProvider theme={darkTheme}>
      <Suspense fallback={<Spinner />}>
        <div
          className={`${styles.styledDiv} ${open ? styles.styledDivOpen : ""} ${location?.pathname === "/" ? styles.styledDivHome : ""}`}
        >
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header location={location} />
          <div className={styles.styledBodyDiv}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/esports/leagues/:leagueId" component={Esports} />
              <Route exact path="/esports/:view(tournaments|players)?" component={Esports} />
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
          </div>
          <div className={styles.adBannerDiv}>
            {includeAds && config.VITE_ENABLE_RIVALRY && (
              <div style={{ fontSize: "12px" }}>
                <a href="https://www.rivalry.com/opendota">
                  <img
                    src="/assets/images/rivalry-banner.gif"
                    alt="Logo for Rivalry.com"
                  />
                </a>
                <div>
                  {strings.home_sponsored_by}{" "}
                  <a href="https://www.rivalry.com/opendota">Rivalry</a>
                </div>
              </div>
            )}
          </div>
          <Footer />
          <button
            className={styles.back2Top}
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
        </div>
      </Suspense>
    </ThemeProvider>
  );
};

export default withRouter(App);
