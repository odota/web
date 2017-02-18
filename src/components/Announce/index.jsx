import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import strings from 'lang';
import { connect } from 'react-redux';
import { getGithubPulls } from 'actions/githubPulls';

import styles from './styles.css';

const dismiss = (value) => {
  if (value && localStorage) {
    localStorage.setItem('dismiss', value);
  }
};

const Announce = ({ title, message, label, link }) => (
  <div className={styles.announce}>
    <main>
      <p>{ title }</p>
      <p>{ message }</p>
    </main>
    <aside>
      <RaisedButton
        backgroundColor={styles.blue}
        onClick={() => dismiss(link)} // I think only link is quite enough, since link for different pc's can not be the same
        href={link}
        label={label}
      />
    </aside>
  </div>
);

const firstPrio = 'blog';
const secondPrio = 'ui';

class RequestLayer extends React.Component {
  componentWillMount() {
    this.setState({ repo: firstPrio });
  }

  componentDidMount() {
    this.props.getData(this.state.repo);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.repo !== nextState.repo) {
      this.props.getData(nextState.repo);
    }
  }

  render() {
    const { error, loading, data } = this.props;

    if (!error && !loading && data && data.length) {
      const {
        merged_at: mergedAt,
        title,
        body,
        html_url: link,
      } = data[0];

      if (mergedAt) {
        // Fetch ui if blog's pr was merged more than 7 days ago
        if (new Date().getDate() - new Date(mergedAt).getDate() >= 7 && this.state.repo === firstPrio) {
          this.setState({ repo: secondPrio });
        }

        if (localStorage.getItem('dismiss') !== link) {
          return (<Announce
            title={title}
            message={body || ''}
            label={this.state.repo === 'blog' ? strings.announce_blogpost : strings.announce_patch}
            link={link}
          />);
        }
      }
    }

    return null;
  }
}

export default connect(
  (state) => {
    const { error, loading, data } = state.app.ghPulls;

    return {
      error,
      loading,
      data,
    };
  },
  dispatch => ({
    getData: repo => dispatch(getGithubPulls(repo)),
  }),
)(RequestLayer);
