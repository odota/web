import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { transformations, formatSeconds, getOrdinal, displayHeroId } from '../../utility';
import { getRecords } from '../../actions';
import Table from '../Table';
import Heading from '../Heading';
// import { IconRadiant, IconDire, IconTrophy } from '../Icons';
import Container from '../Container';
import TabBar from '../TabBar';

const matchesColumns = (field, strings) => [{
  displayName: strings.th_rank,
  field: 'rank',
  displayFn: (row, col, _field) => getOrdinal(_field),
}, {
  displayName: strings[`heading_${field}`],
  tooltip: strings[`tooltip_${field}`],
  field: 'score',
  displayFn: (row, col, _field) => (!row.hero_id ? formatSeconds(_field) : Number(_field).toLocaleString()),
}, {
  displayName: strings.th_match_id,
  tooltip: strings.match_id,
  field: 'match_id',
  displayFn: transformations.match_id_with_time,
}, {
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  displayFn: (row, col, _field) => (!row.hero_id ? null : displayHeroId(row, col, _field)),
}];

const fields = ['duration', 'kills', 'deaths', 'assists', 'gold_per_min', 'xp_per_min', 'last_hits', 'denies', 'hero_damage', 'tower_damage', 'hero_healing'];

const tabs = strings => (fields.map(field => ({
  name: strings[`heading_${field}`],
  key: field,
  tooltip: strings[`tooltip_${field}`],
  content: propsPar => (
    <Container>
      <Table
        data={propsPar.data.map((element, index) => ({ ...element, rank: index + 1 }))}
        columns={matchesColumns(field, strings)}
        loading={propsPar.loading}
      />
    </Container>),
  route: `/records/${field}`,
})));

const getData = (props) => {
  const route = props.match.params.info || 'duration';
  props.dispatchRecords(route);
};

class RequestLayer extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        info: PropTypes.string,
      }),
    }),
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.info !== prevProps.match.params.info) {
      getData(this.props);
    }
  }
  render() {
    const route = this.props.match.params.info || 'duration';
    const { strings } = this.props;

    const tab = tabs(strings).find(_tab => _tab.key === route);
    return (
      <div>
        <Helmet title={strings.heading_records} />
        <div>
          <TabBar
            info={route}
            tabs={tabs(strings)}
          />
          <Heading title={strings.heading_records} subtitle={strings.subheading_records} className="top-heading with-tabbar"/>
          {tab && tab.content(this.props)}
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.records.data,
  loading: state.app.records.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  dispatchRecords: info => dispatch(getRecords(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
