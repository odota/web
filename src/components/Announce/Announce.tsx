import React, { MouseEventHandler } from "react";
import { Button } from "../ui";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { getGithubPulls } from "../../actions";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./Announce.module.css";

const Announce = ({
  title,
  body,
  onClick,
  link,
}: {
  title: string;
  body: string;
  onClick: MouseEventHandler<{}>;
  link: string;
}) => {
  const strings = useStrings();
  return (
    <div className={styles.styledDiv}>
      <main>
        <h4>{title}</h4>
        {body && <ReactMarkdown>{body}</ReactMarkdown>}
      </main>
      <aside>
        <Button href={link} target="_blank">
          {strings.announce_github_more}
        </Button>
      </aside>
      <aside>
        <Button onClick={onClick}>{strings.announce_dismiss}</Button>
      </aside>
    </div>
  );
};

class AnnounceWrapper extends React.Component<
  {
    error: string;
    getPulls: Function;
    loading: boolean;
    data: any;
  },
  { dismissed?: boolean }
> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  dismiss = (value: string) => {
    if (localStorage) {
      localStorage.setItem("dismiss", value);
    }
    this.setState({ dismissed: true });
  };

  getDate = (days: number) => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const date = new Date(Number(new Date()) - msPerDay * days);
    return date.toISOString().split("T")[0];
  };

  componentDidMount() {
    this.props.getPulls(this.getDate(5));
  }

  render() {
    const { error, loading, data } = this.props;

    if (!error && !loading && data) {
      if (data.items && data.items[0]) {
        const { title, body, number, html_url: link } = data.items[0];

        if (
          localStorage &&
          !this.state.dismissed &&
          Number(localStorage.getItem("dismiss")) < number
        ) {
          return (
            <Announce
              title={title}
              body={body}
              onClick={() => this.dismiss(number)}
              link={link}
            />
          );
        }
      }
    }

    return null;
  }
}

const mapStateToProps = (state: any) => {
  const { error, loading, data } = state.app.ghPulls;

  return {
    error,
    loading,
    data,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getPulls: (repo: string) => dispatch(getGithubPulls(repo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnounceWrapper);
