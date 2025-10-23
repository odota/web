import React from 'react';
import { List } from 'react-content-loader';
import TabBar from '../TabBar';

class RenderContent extends React.Component<{ skeleton?: boolean, content: any }> {
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
      skeleton ? <List primaryColor="#666" width={250} height={120} /> : null;

    return render && content ? (
      content
    ) : (
      <div style={{ width: '100%', height: 1200 }}>
        <PlaceHolder />
      </div>
    );
  }
}

const TabbedContent = ({ info, tabs, match, content, skeleton }: {
  tabs: any[],
  info: string,
  match: any,
  content: any,
  skeleton?: boolean,
}) => (
  <React.Fragment>
    <TabBar info={info} tabs={tabs} match={match} />
    <RenderContent content={content} skeleton={skeleton} key={info} />
  </React.Fragment>
);

export default TabbedContent;
