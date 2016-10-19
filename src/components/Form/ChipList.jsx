import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Chip from 'material-ui/Chip';
import querystring from 'querystring';
// import { form } from 'reducers';
// import { deleteChip } from 'actions';
import styles from './ChipList.css';

const ChipList = ({ chipList, deleteChip, router, name }) => (
  <div className={styles.container}>
    {chipList.map((chip, index) => (
      <Chip
        style={{ textTransform: 'uppercase', margin: '0 5px 5px 0' }}
        key={index}
        onRequestDelete={() => {
          const query = querystring.parse(window.location.search.substring(1));
          const field = [].concat(query[name] || []);
          router.push({pathname: window.location.pathname, query: { 
            ...query,
            [name]: [
              ...field.slice(0, index),
              ...field.slice(index + 1),
            ],
          }});          
        }}
      >
        {chip.text}
      </Chip>
    ))}
  </div>
);

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChipList));
