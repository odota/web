import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const ExplorerOutputButton = ({ secondary, label, format, href, download, onClick, context }) => {
  const defaultClickFn = () => {
    context.setState({ ...context.state, builder: { ...context.state.builder, format } }, context.syncWindowHistory);
  };
  return (<RaisedButton
    secondary={secondary}
    style={{ margin: '5px' }}
    label={label}
    href={href}
    download={download}
    onClick={onClick || defaultClickFn}
  />);
};

export default ExplorerOutputButton;
