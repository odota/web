/* global localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import strings from 'lang';
import { connect } from 'react-redux';
import { getGithubPulls } from 'actions';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import constants from '../constants';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: #34a5ff;

  & main,
  & aside {
    padding: 8px 20px;
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
  title, body, onClick, link,
}) => (
  <StyledDiv>
    <main>
      <h4>{title}</h4>
      {body && <ReactMarkdown source={body} />}
    </main>
    <aside>
      <RaisedButton
        backgroundColor={constants.colorBlue}
        href={link}
        target="_blank"
        label={strings.announce_github_more}
      />
    </aside>
    <aside>
      <RaisedButton
        backgroundColor={constants.colorBlue}
        onClick={onClick}
        label={strings.announce_dismiss}
      />
    </aside>
  </StyledDiv>
);

Announce.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.string,
};

class RequestLayer extends React.Component {
  constructor() {
    super();

    this.state = {
      isDismissed: false,
    };

    this.dismiss = (value) => {
      if (localStorage) {
        this.setState({
          isDismissed: true,
        });
        localStorage.setItem('dismiss', value);
      }
    };

    this.getDate = (days) => {
      const msPerDay = 24 * 60 * 60 * 1000;

      const date = new Date(new Date() - (msPerDay * days));

      return date.toISOString().split('T')[0];
    };
  }

  componentWillMount() {
    this.props.getPulls(this.getDate(5));
  }

  render() {
    const { error, loading, data } = this.props;

    if (!error && !loading && data) {
      if (data.items && data.items[0]) {
        const {
          title,
          body,
          number,
          html_url: link,
        } = data.items[0];

        if (localStorage && Number(localStorage.getItem('dismiss')) < number) {
          return <Announce title={title} body={body} onClick={() => this.dismiss(number)} link={link} location={window.location} />;
        }
      }
    }

    return null;
  }
}

RequestLayer.propTypes = {
  getPulls: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const mapStateToProps = (state) => {
  const { error, loading, data } = state.app.ghPulls;

  return {
    error,
    loading,
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  getPulls: repo => dispatch(getGithubPulls(repo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
