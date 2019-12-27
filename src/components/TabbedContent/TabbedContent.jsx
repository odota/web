import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-content-loader';
import TabBar from '../TabBar';

class RenderContent extends React.Component {
  static propTypes = {
    skeleton: PropTypes.bool,
    content: PropTypes.shape({}),
  };

  state = {
    render: false,
  };

  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.setState({ render: true }));
    });
  }

  render() {
    const { skeleton, content } = this.props;
    const { render } = this.state;

    const PlaceHolder = () =>
      (skeleton ? <List primaryColor="#666" width={250} height={120} /> : null);

    return render && content ? (
      content
    ) : (
      <div style={{ width: '100%', height: 1200 }}>
        <PlaceHolder />
      </div>
    );
  }
}

const TabbedContent = ({
  info, tabs, match, content, skeleton,
}) => (
  <React.Fragment>
    <TabBar info={info} tabs={tabs} match={match} />
    <RenderContent content={content} skeleton={skeleton} key={info} />
  </React.Fragment>
);

TabbedContent.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})),
  info: PropTypes.string,
  match: PropTypes.shape({}),
  content: PropTypes.shape({}),
  skeleton: PropTypes.bool,
};

export default TabbedContent;
