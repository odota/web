import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import {
  transformations,
  formatSeconds,
  getOrdinal,
  displayHeroId,
} from "../../utility";
import { getRecords } from "../../actions";
import Table from "../Table/Table";
import Heading from "../Heading/Heading";
// import { IconRadiant, IconDire, IconTrophy } from '../Icons';
import Container from "../Container/Container";
import TabBar from "../TabBar/TabBar";

const matchesColumns = (field: string, strings: Strings) => [
  {
    displayName: strings.th_rank,
    field: "rank",
    displayFn: (row: any, col: any, _field: any) => getOrdinal(_field),
  },
  {
    displayName: strings[`heading_${field}` as keyof Strings],
    tooltip: strings[`tooltip_${field}` as keyof Strings],
    field: "score",
    displayFn: (row: any, col: any, _field: any) =>
      !row.hero_id ? formatSeconds(_field) : Number(_field).toLocaleString(),
  },
  {
    displayName: strings.th_match_id,
    tooltip: strings.match_id,
    field: "match_id",
    displayFn: transformations.match_id_with_time,
  },
  {
    displayName: strings.th_hero_id,
    tooltip: strings.tooltip_hero_id,
    field: "hero_id",
    displayFn: (row: any, col: any, _field: any) =>
      !row.hero_id ? null : displayHeroId(row, col, _field),
  },
];

const fields = [
  "duration",
  "kills",
  "deaths",
  "assists",
  "gold_per_min",
  "xp_per_min",
  "last_hits",
  "denies",
  "hero_damage",
  "tower_damage",
  "hero_healing",
];

const tabs = (strings: Strings) =>
  fields.map((field) => ({
    name: strings[`heading_${field}` as keyof Strings],
    key: field,
    tooltip: strings[`tooltip_${field}` as keyof Strings],
    content: (propsPar: RecordsProps) => (
      <Container>
        <Table
          data={propsPar.data.map((element, index) => ({
            ...element,
            rank: index + 1,
          }))}
          columns={matchesColumns(field, strings)}
          loading={propsPar.loading}
        />
      </Container>
    ),
    route: `/records/${field}`,
  }));

const getData = (props: RecordsProps) => {
  const route = props.match.params.info || "duration";
  props.dispatchRecords(route);
};

type RecordsProps = {
  match: { params: { info?: string } };
  strings: Strings;
  dispatchRecords: Function;
  data: any[];
  loading: boolean;
};

class RecordsPage extends React.Component<RecordsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: RecordsProps) {
    if (this.props.match.params.info !== prevProps.match.params.info) {
      getData(this.props);
    }
  }
  render() {
    const route = this.props.match.params.info || "duration";
    const { strings } = this.props;

    const tab = tabs(strings).find((_tab) => _tab.key === route);
    return (
      <div>
        <Helmet title={strings.heading_records} />
        <div>
          <Heading
            title={strings.heading_records}
            subtitle={strings.subheading_records}
            className="top-heading"
          />
          <TabBar tabs={tabs(strings)} />
          {tab && tab.content(this.props)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.records.data,
  loading: state.app.records.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchRecords: (info: string) => dispatch(getRecords(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage);
