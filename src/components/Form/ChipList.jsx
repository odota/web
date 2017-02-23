import React from 'react';
import Chip from 'material-ui/Chip';
// import { form } from 'reducers';
import styles from './ChipList.css';

const ChipList = ({ chipList, deleteChip, name }) => (
  <div className={styles.container}>
    {chipList.map((chip, index) => (
      <Chip
        style={{ textTransform: 'uppercase', margin: '0 5px 5px 0' }}
        key={index}
        onRequestDelete={() => deleteChip(name, index)}
      >
        {chip.text}
      </Chip>
    ))}
  </div>
);

export default ChipList;
