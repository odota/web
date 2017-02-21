/* global localStorage */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import strings from 'lang';
import { connect } from 'react-redux';
import { getGithubPulls } from 'actions/githubPulls';
import ReactMarkdown from 'react-markdown';
import { IconGithub } from 'components/Icons';

import styles from './styles.css';

const Announce = ({ title, body, onClick, link }) => (
  <div className={styles.announce}>
    <main>
      <h4><a href={link} title={strings.announce_github_more}><IconGithub /> {title}</a></h4>
      {body && <ReactMarkdown source={body} />}
    </main>
    <aside>
      <RaisedButton
        backgroundColor={styles.blue}
        onClick={onClick}
        label={strings.announce_dismiss}
      />
    </aside>
  </div>
);

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
    this.props.getPulls(this.getDate(10));
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

        if (localStorage && Number(localStorage.getItem('dismiss')) !== number) {
          return <Announce title={title} body={body} onClick={() => this.dismiss(number)} link={link} />;
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
  };
};

const mapDispatchToProps = dispatch => ({
  getPulls: repo => dispatch(getGithubPulls(repo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
