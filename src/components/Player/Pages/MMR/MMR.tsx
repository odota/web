import React from 'react';
import { connect } from 'react-redux';
import { MMRGraph } from '../../../Visualizations';
import { getPlayerMmr } from '../../../../actions';
import Container from '../../../Container/Container';
import Info from '../../../Alerts/Info';
import useStrings from '../../../../hooks/useStrings.hook';

const MMRInfo = (strings: Strings) => (
  <Info>
    <a
      href="https://blog.opendota.com/2016/01/13/opendota-mmr-and-you/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {strings.mmr_not_up_to_date}
    </a>
  </Info>
);

const MMR = ({
  columns,
  error,
  loading,
}: {
  columns: any[];
  error: string;
  loading: boolean;
}) => {
  const strings = useStrings();
  return (
    <div>
      <Container
        title={strings.heading_mmr}
        subtitle={MMRInfo(strings)}
        error={error}
        loading={loading}
      >
        <MMRGraph columns={columns} />
      </Container>
    </div>
  );
};

const getData = (props: MMRProps) => {
  props.getPlayerMmr(props.playerId, props.location.search);
};

type MMRProps = {
  location: {
    key: string;
    search?: string;
  };
  playerId: string;
  columns: any[];
  loading: boolean;
  error: string;
  getPlayerMmr: Function;
};

class RequestLayer extends React.Component<MMRProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: MMRProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <MMR {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  columns: state.app.playerMmr.data,
  loading: state.app.playerMmr.loading,
  error: state.app.playerMmr.error,
});

export const MMRPage = connect(mapStateToProps, { getPlayerMmr })(RequestLayer);
