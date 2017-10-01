import React from 'react';
import PropTypes from 'prop-types';
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

ChipList.propTypes = {
  chipList: PropTypes.array,
  deleteChip: PropTypes.func,
  name: PropTypes.string,
  history: PropTypes.object,
};

export default ChipList;
