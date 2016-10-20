import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Chip from 'material-ui/Chip';
// import { form } from 'reducers';
import { deleteChip } from 'actions';
import styles from './ChipList.css';

const ChipList = ({ deleteChip, chipList, router, name }) => (
  <div className={styles.container}>
    {chipList.map((chip, index) => (
      <Chip
        style={{ textTransform: 'uppercase', margin: '0 5px 5px 0' }}
        key={index}
        onRequestDelete={() => deleteChip(router, name, index)}
      >
        {chip.text}
      </Chip>
    ))}
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deleteChip: (router, name, index) => dispatch(deleteChip(router, name, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChipList));
