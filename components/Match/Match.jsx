import React from 'react';
import { MatchTable } from '../Table';
import { getMatch } from '../../actions';
import { connect } from 'react-redux';
import { overviewColumns, abUpgradeColumns } from '../Table/columnDefinitions/matchColumns.jsx';

//TODO only show ability upgrades if players have it
//<MatchTable columns={abUpgradeColumns} />
const Match = () => (
  <div>
    <MatchTable columns={overviewColumns} />
  </div>
);

const mapStateToProps = (state, { params }) => ({ matchId: params.match_id });

const mapDispatchToProps = (dispatch) => ({
  sort: (column) => dispatch(getMatch(column)),
  getMatch: (matchId) => dispatch(getMatch(matchId)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.routeParams.match_id);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match_id !== nextProps.match_id) {
      this.props.getMatch(nextProps.match_id);
    }
  }

  render() {
    return (
      <div>
        <Match {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
