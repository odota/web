import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ChipList = ({
  chipList, deleteChip, name, history,
}) => (
  <StyledDiv className="chip">
    {chipList.map((chip, index) => (
      <Chip
        style={{ margin: '0 5px 5px 0' }}
        key={chip.text}
        onRequestDelete={() => deleteChip(name, index, history)}
      >
        {chip.text}
      </Chip>
    ))}
  </StyledDiv>
);

ChipList.propTypes = {
  chipList: PropTypes.arrayOf({}),
  deleteChip: PropTypes.func,
  name: PropTypes.string,
  history: PropTypes.shape({}),
};

export default ChipList;
