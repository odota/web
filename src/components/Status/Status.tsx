import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import CountUp from 'react-countup';
import { abbreviateNumber } from '../../utility';
import Table from '../Table';
import config from '../../config';
import { LazyLog, ScrollFollow } from '@melloware/react-logviewer';
import useStrings from '../../hooks/useStrings.hook';

const columns = [
  { displayName: 'key', field: 'key' },
  {
    displayName: 'value',
    field: 'value',
    displayFn: (row: any) =>
      row.end != null ? (
        <CountUp
          start={row.start}
          end={row.end}
          duration={10}
          delay={0}
          useEasing={false}
        />
      ) : (
        row.value
      ),
  },
];

const tableStyle: React.CSSProperties = {};

const Status = () => {
  const strings = useStrings();
  const [ts, setTs] = useState(Number(new Date()));
  const [state, setState] = useState({
    current: {} as Record<string, any>,
    last: {} as Record<string, any>,
  });
  useEffect(() => {
    let last = state.current;
    const update = async () => {
      const resp = await fetch(`${config.VITE_API_HOST}/status`, { credentials: 'include' });
      const json = await resp.json();
      const nextState = { current: json, last };
      setState(nextState);
      // Save the value for the next update
      last = nextState.current;
    };
    update();
    setInterval(update, 10000);
    setInterval(
      () => {
        // Periodically clear the logs and reconnect
        setTs(Number(new Date()));
      },
      10 * 60 * 1000,
    );
  }, []);
    return (
      <>
        <Helmet title={strings.title_status} />
        <div style={{ height: '300px', overflow: 'hidden' }}>
          {
            <ScrollFollow
              startFollowing={true}
              render={({ follow, onScroll }) => (
                <LazyLog
                  key={ts}
                  stream
                  url={`${config.VITE_API_HOST.replace('http', 'ws')}`}
                  websocket
                  follow={follow}
                  onScroll={onScroll}
                  enableSearch
                  selectableLines
                  wrapLines
                  onLoad={() => {
                    // Trigger a reload since socket connection ended
                    setTs(Number(new Date()));
                  }}
                />
              )}
            />
          }
        </div>
        {/* <button style={{ width: '200px', height: '40px', margin: '8px' }} onClick={() => this.setState({ follow: !this.state.follow })}>{this.state.follow ? 'Stop' : 'Start'}</button> */}
        <div
          style={{
            columnCount: window.innerWidth < 600 ? 1 : 3,
          }}
        >
          {Object.keys(state.current).map((propName) => {
            if (typeof state.current[propName] !== 'object') {
              return state.current[propName];
            }
            if (typeof Object.values(state.current[propName])[0] !== 'number') {
              return (
                <Table
                  key={propName}
                  style={tableStyle}
                  data={Object.keys(state.current[propName] || {}).map(
                    (key) => ({
                      key,
                      value: state.current[propName]?.[key]?.metric,
                      start:
                        state.last?.[propName]?.[key]?.metric ??
                        state.current[propName]?.[key]?.metric,
                      end: state.current[propName]?.[key]?.metric,
                      limit: state.current[propName]?.[key]?.limit,
                    }),
                  )}
                  columns={[...columns, {
                    displayName: 'limit', 
                    field: 'limit',
                    displayFn: (row: any) => {
                      return abbreviateNumber(row.limit)
                    },
                  }]}
                />
              );
            }
            return (
                <Table
                  key={propName}
                  style={tableStyle}
                  data={Object.keys(state.current[propName] || {})
                    .map((key) => ({
                      key,
                      value: state.current[propName]?.[key],
                      start:
                        state.last?.[propName]?.[key] ??
                        state.current[propName]?.[key],
                      end: state.current[propName]?.[key],
                    }))
                    .filter((item) => item.value)}
                  columns={columns}
                />
            );
          })}
        </div>
      </>
    );
}

export default Status;
