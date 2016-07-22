import React from 'react';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
import { form } from '../../reducers';
import { deleteChip } from '../../actions';
import styles from './ChipList.css';

const ChipList = ({ chipList, deleteChip }) => (
  <div className={styles.container}>
    {chipList.map((chip, index) => (
      <Chip
        style={{ textTransform: 'uppercase', margin: '0 5px 5px 0' }}
        key={index}
        onRequestDelete={() => deleteChip(index)}
      >
        {chip.text}
      </Chip>
    ))}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  chipList: form.getChipList(state, ownProps.formName, ownProps.name),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteChip: index => dispatch(deleteChip(ownProps.formName, ownProps.name, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChipList);
