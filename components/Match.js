import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { matchActions } from '../actions';
class Match extends React.Component
{
  constructor(props)
  {
    super(props);
  }
  componentDidMount()
  {
    //commenting it out so I can try to merge with master more quickly instead of refactoring everything before merging with master
    // this.props.dispatch(Actions.fetchData(Actions.MATCH,
    // {
    //   match_id: this.props.params.match_id
    // }));
  }
  render()
  {
    //sections
    return <pre>{JSON.stringify(this.props, null, 2)}</pre>;
  }
}

function mapStateToProps(data)
{
  return {
    data
  };
}
export default connect(mapStateToProps)(Match);
