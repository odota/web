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
    const update = () => fetch(`${config.VITE_API_HOST}/status`)
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
          columnCount: window.innerWidth < 600 ? 1 : 3,
        }}
        >
          {Object.keys(this.state.result).map(propName => {
            if (typeof this.state.result[propName] !== "object") {
              return this.state.result[propName];
            }
            if (propName === 'health') {
              return <Table
                style={tableStyle}
                data={Object.keys(this.state.result.health || {})
                  .map((key) => ({
                    key,
                    value: `${abbreviateNumber(this.state.result.health[key].metric)}/${abbreviateNumber(this.state.result.health[key].threshold)}`,
                  }))}
                columns={columns}
              />;
            }
            return <div>
              <Table
              style={tableStyle}
              data={Object.keys(this.state.result[propName] || {})
                .map((key) => ({ key, value: this.state.result[propName]?.[key], start: this.state.last?.[propName]?.[key] ?? this.state.result[propName]?.[key], end: this.state.result[propName]?.[key] }))
                .filter(item => item.value)}
              columns={columns}
            />
            </div>;
          })}
        </div>
      </>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Status);
