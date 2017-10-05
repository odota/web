/* global API_HOST */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getRecords } from 'actions';
import strings from 'lang';
import Table from 'components/Table';
import Heading from 'components/Heading';
import { transformations, formatSeconds, getOrdinal } from 'utility';
// import { IconRadiant, IconDire, IconTrophy } from 'components/Icons';
import Container from 'components/Container';
import TabBar from 'components/TabBar';

const matchesColumns = field => [{
  displayName: strings.th_rank,
  field: 'rank',
  displayFn: (row, col, _field) => getOrdinal(_field),
}, {
  displayName: strings[`th_${field}`],
  field: 'score',
  displayFn: (row, col, _field) => (row.hero_id === '' ? formatSeconds(_field) : Number(_field).toLocaleString()),
}, {
  displayName: strings.th_match_id,
  field: 'match_id',
  displayFn: transformations.match_id_with_time,
}, {
  displayName: '',
  field: 'hero_id',
  displayFn: (row, col, _field) => (row.hero_id === '' ? null : transformations.hero_id(row, col, _field)),
}];

const fields = ['duration', 'kills', 'deaths', 'assists', 'gold_per_min', 'xp_per_min', 'last_hits', 'denies', 'hero_damage', 'tower_damage', 'hero_healing'];

const tabs = fields.map(field => ({
  name: strings[`th_${field}`],
  key: field,
  content: propsPar => (<Container>
    <Table data={propsPar.data.map((element, index) => ({ ...element, rank: index + 1 }))} columns={matchesColumns(field)} />
  </Container>),
  route: `/records/${field}`,
}));

const getData = (props) => {
  const route = props.match.params.info || 'duration';
  props.dispatchRecords(route);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match.params.info !== nextProps.match.params.info) {
      getData(nextProps);
    }
  }
  render() {
    const route = this.props.match.params.info || 'duration';

    const tab = tabs.find(_tab => _tab.key === route);
    return (<div>
      <Helmet title={strings.heading_records} />
      <div>
        <Heading title={strings.heading_records} subtitle={strings.subheading_records} />
        <TabBar
          info={route}
          tabs={tabs}
        />
        {tab && tab.content(this.props)}
      </div>
    </div>);
  }
}

RequestLayer.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  data: state.app.records.data,
  loading: state.app.records.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchRecords: info => dispatch(getRecords(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
