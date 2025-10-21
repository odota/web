import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const ExplorerOutputButton = ({
  defaultSelected,
  label,
  format,
  href,
  download,
  onClick,
  context,
}: {
  defaultSelected?: boolean,
  label: string,
  format?: string,
  href?: string,
  download?: string,
  onClick?: (e: React.MouseEvent) => void,
  context: any,
}) => {
  let clickFn;
  if (onClick) {
    clickFn = onClick;
  } else if (format) {
    clickFn = () => {
      context.setState(
        { ...context.state, builder: { ...context.state.builder, format } },
        context.syncWindowHistory,
      );
    };
  } else {
    clickFn = (noOp: any) => noOp;
  }
  return (
    <RaisedButton
      secondary={
        Boolean(format &&
        ((defaultSelected && !context.state.builder.format) ||
          context.state.builder.format === format))
      }
      style={{ margin: '5px' }}
      label={label}
      href={href}
      //@ts-expect-error
      download={download}
      onClick={clickFn}
    />
  );
};

export default ExplorerOutputButton;
