import React from 'react';
import Clear from 'material-ui/svg-icons/content/clear';
import Filter from 'material-ui/svg-icons/content/filter-list';
import strings from 'lang';
import FlatButton from 'material-ui/FlatButton';
import styles from './ShowFormToggle.css';

const getIcon = (show) => {
  if (!show) {
    return <Filter className={styles.filterIcon} />;
    // return (
    //   <svg viewBox="0 0 24 24">
    //     <path d="M3,2H21V2H21V4H20.92L15,9.92V22.91L9,16.91V9.91L3.09,4H3V2M11,16.08L13,18.08V9H13.09L18.09,4H5.92L10.92,9H11V16.08Z" />
    //   </svg>
    // );
  }
  return <Clear className={styles.closeIcon} />;
};

const ShowFormToggle = ({ toggleShowForm, showForm }) => (
  <FlatButton onClick={() => toggleShowForm()}>
    <div className={styles.container}>
      {getIcon(showForm)}
      <span>{showForm ? strings.filter_button_text_close : strings.filter_button_text_open}</span>
    </div>
  </FlatButton>
);

// const mapStateToProps = () => ({});

export default ShowFormToggle;
