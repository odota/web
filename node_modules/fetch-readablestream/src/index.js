import defaultTransportFactory  from './defaultTransportFactory';

export default function fetchStream(url, options = {}) {
  let transport = options.transport;
  if (!transport) {
    transport = fetchStream.transportFactory();
  }

  return transport(url, options);
}

// override this function to delegate to an alternative transport function selection
// strategy; useful when testing.
fetchStream.transportFactory = defaultTransportFactory;