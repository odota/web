import React from 'react';
import Chip from 'material-ui/Chip';
import styles from './ChipList.css';

const ChipList = ({ chipList, deleteChip, name, history }) => (
  <div className={styles.container}>
    {chipList.map((chip, index) => (
      <Chip
        style={{ margin: '0 5px 5px 0' }}
        key={index}
        onRequestDelete={() => deleteChip(name, index, history)}
      >
        {chip.text}
      </Chip>
    ))}
  </div>
);

export default ChipList;
