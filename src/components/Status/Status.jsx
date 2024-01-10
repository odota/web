import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import CountUp from 'react-countup';
import { LazyLog } from 'react-lazylog';
import { abbreviateNumber } from '../../utility';
import Table from '../Table';
import config from '../../config';

function jsonResponse(response) {
  return response.json();
}

const columns = [
  { displayName: 'key', field: 'key' },
  { displayName: 'value', field: 'value', displayFn: (row) => row.end != null ? <CountUp start={row.start} end={row.end} duration={10} delay={0} useEasing={false} /> : row.value },
];

const tableStyle = {
  flexGrow: 1,
  overflowX: 'auto',
  boxSizing: 'border-box',
  padding: '15px',
};

class Status extends React.Component {
  static propTypes = {
    strings: PropTypes.shape({}),
  }

  state = {
    result: {},
    last: {},
    ts: new Date(),
    follow: true,
  }

  componentDidMount() {
    const update = () => fetch(`${config.VITE_API_HOST}/api/status`)
      .then(jsonResponse)
      .then(async (json) => {
        const nextState = { result: json, last: this.state.result };
        return this.setState(nextState);
      });
    update();
    setInterval(update, 10000);
    setInterval(() => {
      // Periodically clear the logs and reconnect
      this.setState({ ts: new Date() });
    }, 30 * 60 * 1000);
  }
  render() {
    const { strings } = this.props;
    return (
      <>
        <Helmet title={strings.title_status} />
        <div style={{ minWidth: '300px', width: '80vw', height: '300px' }}>
          <LazyLog
            key={Number(this.state.ts)}
            stream
            url={`${config.VITE_API_HOST.replace('http', 'ws')}`}
            websocket
            follow={this.state.follow}
            enableSearch
            selectableLines
            onLoad={() => {
              // Trigger a reload since we finished connecting to socket
              this.setState({ ts: new Date() });
            }
            }
          />
        </div>
        <button style={{ width: '200px', height: '40px', margin: '8px' }} onClick={() => this.setState({ follow: !this.state.follow })}>{this.state.follow ? 'Stop' : 'Start'}</button>
        <div style={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontSize: '10px',
        }}
        >
          <Table
            style={tableStyle}
            data={Object.keys(this.state.result)
              .filter((key) => typeof (this.state.result[key]) !== 'object')
              .map((key) => ({ key, value: this.state.result[key], start: this.state.last[key] ?? this.state.result[key], end: this.state.result[key] }))}
            columns={columns}
          />
          <div>
            <Table
              style={tableStyle}
              data={Object.keys(this.state.result.health || {})
                .map((key) => ({
                  key,
                  value: `${abbreviateNumber(this.state.result.health[key].metric)}/${abbreviateNumber(this.state.result.health[key].threshold)}`,
                }))}
              columns={columns}
            />
            <Table
              style={tableStyle}
              data={Object.keys(this.state.result.load_times || {})
                .map((key) => ({ key, value: this.state.result.load_times?.[key], start: this.state.last?.load_times?.[key] ?? this.state.result.load_times?.[key], end: this.state.result.load_times?.[key] }))}
              columns={columns}
            />
            <Table
              style={tableStyle}
              data={(this.state.result.api_status || [])
                .slice()
                .reverse()
                .map((row) => ({ key: row.status, value: row.count, start: this.state.last?.api_status?.find(row2 => row2.status === row.status)?.count ?? row.count, end: row.count }))
              }
              columns={columns}
            />
            <Table
              style={tableStyle}
              data={(this.state.result.retriever || [])
                .slice()
                .reverse()
                .map(row => ({ key: row.hostname, value: row.count, start: this.state.last?.retriever?.find(row2 => row2.hostname === row.hostname)?.count ?? row.count, end: row.count }))
              }
              columns={columns}
            />
          </div>
          <Table
            style={tableStyle}
            data={(this.state.result.api_paths || [])
              .slice()
              .reverse()
              .map((row) => ({ key: row.hostname, value: row.count, start: this.state.last?.api_paths?.find(row2 => row2.hostname === row.hostname)?.count ?? row.count, end: row.count }))
            }
            columns={columns}
          />
        </div>
      </>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Status);
