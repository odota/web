import React from 'react';
import { Button } from '@mui/material';
import useStrings from '../../hooks/useStrings.hook';

const ButtonGarden = ({
  buttonNames,
  selectedButton,
  onClick,
}: {
  buttonNames: string[];
  selectedButton: string;
  onClick: Function;
}) => {
  const strings = useStrings();
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {buttonNames.map((buttonName) => (
        <Button
          sx={{ width: '180px' }}
          size="small"
          variant={selectedButton === buttonName ? 'contained' : 'outlined'}
          onClick={(e) => onClick(buttonName)}
          key={buttonName}
        >
          {strings[`heading_${buttonName}` as keyof Strings]}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGarden;
