import React from 'react';
import { Button } from '@mui/material';

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
    <Button
      style={{ margin: '5px' }}
      href={href ?? ''}
      download={download}
      onClick={clickFn}
    >{label}</Button>
  );
};

export default ExplorerOutputButton;
