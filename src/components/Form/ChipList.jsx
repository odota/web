import React from 'react';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
// import { form } from 'reducers';
import querystring from 'querystring';
import { browserHistory } from 'react-router';
import styles from './ChipList.css';

const deleteChip = (name, index) => {
  const query = querystring.parse(window.location.search.substring(1));
  const field = [].concat(query[name] || []);
  const newQuery = {
    ...query,
    [name]: [
      ...field.slice(0, index),
      ...field.slice(index + 1),
    ],
  };
  browserHistory.push(`${window.location.pathname}?${querystring.stringify(newQuery)}`);
};

const ChipList = ({ chipList, name }) => (
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

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChipList);
