import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
    <SelectField
      floatingLabelText={strings.explorer_select}
      value={selectedButton}
      onChange={(event, index, value) => onClick(value)}
    >
      {buttonNames.map((buttonName) => (
        <MenuItem
          value={buttonName}
          key={buttonName}
          primaryText={strings[`heading_${buttonName}` as keyof Strings]}
        />
      ))}
    </SelectField>
  );
};

export default ButtonGarden;
