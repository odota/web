import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const ExplorerOutputButton = ({
  defaultSelected, label, format, href, download, onClick, context,
}) => {
  let clickFn;
  if (onClick) {
    clickFn = onClick;
  } else if (format) {
    clickFn = () => {
      context.setState({ ...context.state, builder: { ...context.state.builder, format } }, context.syncWindowHistory);
    };
  } else {
    clickFn = noOp => noOp;
  }
  return (<RaisedButton
    secondary={format && ((defaultSelected && !context.state.builder.format) || context.state.builder.format === format)}
    style={{ margin: '5px' }}
    label={label}
    href={href}
    download={download}
    onClick={clickFn}
  />);
};

ExplorerOutputButton.propTypes = {
  defaultSelected: PropTypes.string,
  label: PropTypes.string,
  format: PropTypes.string,
  href: PropTypes.string,
  download: PropTypes.string,
  onClick: PropTypes.func,
  context: PropTypes.shape({}),
};

export default ExplorerOutputButton;
