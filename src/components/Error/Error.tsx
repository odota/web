import React from 'react';
import { useStrings } from '../../hooks/useStrings.hook';

const Error = (props: { text?: string }) => {
  const strings = useStrings();
  return <div>Whoops! Something went wrong. ({props.text ? props.text : strings.general_unknown })</div>
};

export default Error;
