import React from 'react';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledDiv, TwoLineDiv } from './Styled';
import { Button } from '@mui/material';
import useStrings from '../../hooks/useStrings.hook';

const Heading = ({
  title = '',
  titleTo,
  icon,
  subtitle,
  buttonLabel,
  buttonTo,
  buttonIcon,
  twoLine,
  info = '',
  winner,
  className,
}: {
  title?: string;
  titleTo?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  buttonLabel?: string;
  buttonTo?: string;
  buttonIcon?: string;
  twoLine?: boolean;
  info?: string;
  winner?: boolean;
  className?: string;
}) => {
  const strings = useStrings();
  const DivToUse = twoLine ? TwoLineDiv : StyledDiv;
  return (
    <DivToUse className={className}>
      <span className="title">
        {icon}
        {titleTo ? <Link to={titleTo}>{title.trim()}</Link> : title.trim()}
      </span>
      <span className="subtitle">
        {subtitle}
        <Tooltip title={info}>
          <span className="info" style={{ display: info ? 'inline' : 'none' }}>
            (?)
          </span>
        </Tooltip>
      </span>
      {winner && <span className="winner">{strings.th_winner}</span>}
      {buttonLabel && buttonTo && buttonIcon ? (
        <span className="sponsor-button">
          <Button
            startIcon={<img src={buttonIcon} alt="" />}
            href={buttonTo}
            target="_blank"
            rel="noopener noreferrer"
          >{buttonLabel}</Button>
        </span>
      ) : (
        <div />
      )}
    </DivToUse>
  );
};

export default Heading;
