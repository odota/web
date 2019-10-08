/* global localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { getGithubPulls } from '../../actions';
import constants from '../constants';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: #008eff;
  padding: 0 16px;

  & main,
  & aside {
    padding: 4px;
  }

  & main {
    flex-grow: 1;

    & > div,
    & a,
    & p {
      font-size: ${constants.fontSizeMedium};
      margin: 0;
      opacity: 0.85;
    }

    & a {
      color: ${constants.textColorPrimary};

      &:hover {
        text-decoration: underline;
      }
    }

    & h4 {
      font-weight: ${constants.fontWeightMedium};
      font-size: ${constants.fontSizeCommon};
      line-height: ${constants.fontSizeCommon};
      margin: 0 0 2px;

      & svg {
        height: 16px;
        fill: ${constants.textColorPrimary};
        vertical-align: sub;
      }
    }

    & ul {
      margin: 2px 0 0;
      padding-left: 20px;

      & li {
        list-style-type: circle;

        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
  }

  & aside {
    flex-shrink: 0;
  }
`;
const Announce = ({
  title, body, onClick, link, strings,
}) => (
  <StyledDiv>
    <main>
      <h4>{title}</h4>
      {body && <ReactMarkdown source={body} />}
    </main>
    <aside>
      <Button href={link} variant="outlined" small target="_blank">{strings.announce_github_more}</Button>
    </aside>
    <aside>
      <IconButton size="small" onClick={onClick}>
        <Close />
      </IconButton>
    </aside>
  </StyledDiv>
);

Announce.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.string,
  strings: PropTypes.shape({}),
};

class RequestLayer extends React.Component {
  static propTypes = {
    getPulls: PropTypes.func,
    error: PropTypes.string,
    loading: PropTypes.bool,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    strings: PropTypes.shape({}),
  };

  constructor() {
    super();

    this.state = {};

    this.dismiss = (value) => {
      if (localStorage) {
        localStorage.setItem('dismiss', value);
      }
      this.setState({ dismissed: true });
    };

    this.getDate = (days) => {
      const msPerDay = 24 * 60 * 60 * 1000;

      const date = new Date(new Date() - (msPerDay * days));

      return date.toISOString().split('T')[0];
    };
  }

  componentDidMount() {
    this.props.getPulls(this.getDate(5));
  }

  render() {
    const {
      error, loading, data, strings,
    } = this.props;

    if (!error && !loading && data) {
      if (data.items && data.items[0]) {
        const {
          title,
          body,
          number,
          html_url: link,
        } = data.items[0];

        if (localStorage && !this.state.dismissed && Number(localStorage.getItem('dismiss')) < number) {
          return <Announce title={title} body={body} onClick={() => this.dismiss(number)} link={link} location={window.location} strings={strings} />;
        }
      }
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  const { error, loading, data } = state.app.ghPulls;

  return {
    error,
    loading,
    data,
    strings: state.app.strings,
  };
};

const mapDispatchToProps = dispatch => ({
  getPulls: repo => dispatch(getGithubPulls(repo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
