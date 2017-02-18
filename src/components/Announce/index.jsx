import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import strings from 'lang';
import { connect } from 'react-redux';
import { getGithubPulls } from 'actions/githubPulls';
import ReactMarkdown from 'react-markdown';

import styles from './styles.css';

const firstPrio = 'blog';
const secondPrio = 'ui';

class RequestLayer extends React.Component {
  constructor() {
    super();
    this.state = {
      repo: firstPrio,
      dismissed: false,
    };

    this.dismiss = (date) => {
      if (date && localStorage) {
        localStorage.setItem('dismiss', date);
        this.setState({
          dismissed: true,
        });
      }
    };
  }

  componentWillMount() {
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

        if (localStorage.getItem('dismiss') !== mergedAt) {
          return (
            <div className={styles.announce}>
              <main>
                <h4>{ title }</h4>
                <ReactMarkdown source={body} />
                {this.state.repo === secondPrio &&
                  <a
                    href={link}
                    onClick={() => this.dismiss(mergedAt)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{strings.announce_release_more}</a>
                }
              </main>
              <aside>
                <RaisedButton
                  backgroundColor={styles.blue}
                  onClick={() => this.dismiss(mergedAt)}
                  label={strings.announce_dismiss}
                />
              </aside>
            </div>
          );
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
