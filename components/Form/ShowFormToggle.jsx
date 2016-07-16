import React from 'react';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import styles from './ShowFormToggle.css';
import { connect } from 'react-redux';
import { toggleShowForm } from '../../actions';

const ShowFormToggle = ({ formName, toggleShowForm, page }) => (
  <FloatingActionButton className={styles.filterButton} onTouchTap={() => toggleShowForm(formName, page)}>
    <FilterList />
  </FloatingActionButton>
);

export default connect(null, { toggleShowForm })(ShowFormToggle);
