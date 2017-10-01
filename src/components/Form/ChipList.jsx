import React from 'react';
import Chip from 'material-ui/Chip';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ChipList = ({ chipList, deleteChip, name, history }) => (
  <StyledDiv>
    {chipList.map((chip, index) => (
      <Chip
        style={{ margin: '0 5px 5px 0' }}
        key={index}
        onRequestDelete={() => deleteChip(name, index, history)}
      >
        {chip.text}
      </Chip>
    ))}
  </StyledDiv>
);

export default ChipList;
