import React from 'react';
import TabBar from '../TabBar/TabBar';
import TableSkeleton from '../Skeletons/TableSkeleton';

class RenderContent extends React.Component<{
  skeleton?: boolean;
  content: any;
}> {
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

    const PlaceHolder = () => (skeleton ? <TableSkeleton /> : null);
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
  info,
  tabs,
  matchData,
  content,
  skeleton,
}: {
  tabs: any[];
  info: string;
  matchData: Match;
  content: any;
  skeleton?: boolean;
}) => (
  <React.Fragment>
    <TabBar tabs={tabs} matchData={matchData} />
    <RenderContent content={content} skeleton={skeleton} key={info} />
  </React.Fragment>
);

export default TabbedContent;
