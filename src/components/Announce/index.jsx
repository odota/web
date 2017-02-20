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
      <h4><a href={link}><IconGithub /></a> {title}</h4>
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

      // Date formatting must follow the ISO8601 standard, which is YYYY-MM-DD--that's year-month-day
      // https://help.github.com/articles/searching-issues/#search-based-on-when-a-pull-request-was-merged
      const YYYY = date.getFullYear();
      const MM = ((0).toString() + (date.getMonth() + 1)).slice(-2);
      const DD = ((0).toString() + date.getDate()).slice(-2);

      return `${YYYY}-${MM}-${DD}`;
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
