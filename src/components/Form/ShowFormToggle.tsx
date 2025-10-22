import React from 'react';
import Clear from 'material-ui/svg-icons/content/clear';
import Filter from 'material-ui/svg-icons/content/filter-list';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import constants from '../constants';
import useStrings from '../../hooks/useStrings.hook';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;

  & svg {
    width: 24px;
    height: 24px;
    margin: 0 5px;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    user-select: none;
  }
`;

const getIcon = (show: boolean) => {
  if (!show) {
    return <Filter style={{ fill: constants.colorBlue }} />;
  }
  return <Clear style={{ fill: constants.colorDanger }} />;
};

const ShowFormToggle = ({ toggleShowForm, showForm }: { toggleShowForm: Function, showForm: boolean }) => {
  const strings = useStrings();
  return <FlatButton onClick={() => toggleShowForm()}>
    <StyledDiv>
      {getIcon(showForm)}
      <span>
        {showForm
          ? strings.filter_button_text_close
          : strings.filter_button_text_open}
      </span>
    </StyledDiv>
  </FlatButton>
};

export default ShowFormToggle;
