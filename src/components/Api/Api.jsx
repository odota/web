import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import strings from '../../lang';
import { postRequest } from '../../actions';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const ApiContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  
  & li {
    list-style-type: initial;
  }
`;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  position: absolute
  
  & div {
    width: 50%;
    height: 50%;
    margin: 20% auto;
  }
`;

class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ matchId: window.location.hash.slice(1) });
  }

  componentDidMount() {
    if (this.state.matchId) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const { dispatchPostRequest } = this.props;
    dispatchPostRequest(this.state.matchId);
  }
  
  

  render() {
    const { progress, error, loading } = this.props;
    const progressIndicator = (progress ?
      <CircularProgress value={progress} mode="determinate" /> :
      <CircularProgress value={progress} mode="indeterminate" />);
    return (
      <div>
        {
          this.state.showModal ? 
          <Modal>
            <ul>
              <li>{strings.api_credit_required}</li>
              <li>{strings.api_stripe}</li>
            </ul>
          </Modal>
          : <div />
        }
        <Helmet title={strings.title_api} />
        <ApiContainer style={{ textAlign: 'center' }}>
          <h1>{strings.api_title}</h1>
          <h3>{strings.api_subtitle}</h3>
          <RaisedButton label={strings.api_get_key} style={{margin:'5px 5px'}} onClick={() => this.setState({showModal: true})} />
          <a href>
            <RaisedButton label={strings.api_docs} style={{margin:'5px 5px'}} onClick={this.handleSubmit} />
          </a>
          <Table style={{width: '60%', margin:'0 auto' }}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>{`${strings.api_first} 25000 ${strings.api_calls_month}`}</TableHeaderColumn>
                <TableHeaderColumn>{`>25000 ${strings.api_calls_month}`}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              <TableRow>
                <TableRowColumn>{strings.api_free}</TableRowColumn>
                <TableRowColumn>{`$1.00 ${strings.api_per_unit}`}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          
          <h3>{strings.api_details}</h3>
          <ul style={{textAlign: 'left'}}>
            <li>{strings.api_key_requirement}</li>
            <li>{strings.api_account_level}</li>
            <li>{strings.api_rate_limit}</li>
            <li>{strings.api_credit_required}</li>
            <li>{strings.api_stripe}</li>
          </ul>
          
          <TextField
            id="match_id"
            floatingLabelText={strings.request_match_id}
            errorText={error && !loading ? strings.request_error : false}
            value={this.state.matchId}
            onChange={e => this.setState({ matchId: e.target.value })}
          />
          <div>{loading ? progressIndicator : <RaisedButton label={strings.request_submit} onClick={this.handleSubmit} />}</div>
        </ApiContainer>
      </div>
    );
  }
}

Request.propTypes = {
  dispatchPostRequest: PropTypes.func,
  progress: PropTypes.number,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { error, loading, progress } = state.app.request;
  return {
    error,
    loading,
    progress,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchPostRequest: matchId => dispatch(postRequest(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
