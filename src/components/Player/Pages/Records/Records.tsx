import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlayerRecords } from '../../../../actions';
import Table from '../../../Table/Table';
import Container from '../../../Container/Container';
import dataColumns from '../matchDataColumns';
import ButtonGarden from '../../../ButtonGarden/ButtonGarden';
import playerRecordsColumns from './playerRecordsColumns';
import useStrings from '../../../../hooks/useStrings.hook';

const excludedColumns = ['win_rate', 'level'];
const recordsColumns = dataColumns.filter(
  (col) => !excludedColumns.includes(col),
);

const Records = ({
  routeParams,
  data,
  error,
  loading,
  playerId,
  history,
}: RecordsProps) => {
  const strings = useStrings();
  const selected = routeParams.subInfo || recordsColumns[0];
  return (
    <div style={{ fontSize: 10 }}>
      <ButtonGarden
        onClick={(buttonName: string) => {
          history.push(
            `/players/${playerId}/records/${buttonName}${window.location.search}`,
          );
        }}
        buttonNames={recordsColumns}
        selectedButton={selected}
      />
      <Container
        title={strings.heading_records}
        error={error}
        loading={loading}
      >
        <Table
          columns={playerRecordsColumns(strings).concat({
            displayName:
              strings[`th_${selected}` as keyof Strings] || strings.th_record,
            displayFn: (row: any, col: any, field: number) =>
              field && field.toFixed ? Number(field.toFixed(2)) : '',
            field: selected,
            relativeBars: true,
          })}
          data={data}
        />
      </Container>
    </div>
  );
};

const getData = (props: RecordsProps) => {
  props.getPlayerRecords(
    props.playerId,
    props.location.search,
    props.routeParams.subInfo || recordsColumns[0],
  );
};

type RecordsProps = {
  routeParams: any;
  playerId: string;
  getPlayerRecords: Function;
  data: any[];
  error: string;
  loading: boolean;
} & RouterProps;

class RequestLayer extends React.Component<RecordsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: RecordsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Records {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerRecords.data,
  error: state.app.playerRecords.error,
  loading: state.app.playerRecords.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerRecords: (playerId: string, options: any, subInfo: string) =>
    dispatch(getPlayerRecords(playerId, options, subInfo)),
});

export const RecordsPage = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RequestLayer),
);
