import React from 'react';
import {
  connect,
} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Prev from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import {
  nextPage,
  prevPage,
  setCurrentPage,
} from 'actions';
import styles from './Pagination.css';

const getPages = ({
  currentPage,
  numPages,
  setCurrentPage,
}) => {
  // let i = currentPage - 4 > 0 ? currentPage - 4 : 0;
  const pages = [];
  pages.push(<FlatButton className={styles.page} onClick={() => setCurrentPage(0)}>1...</FlatButton>);
  const minStart = Math.max(numPages - 5, 0);
  const minEnd = Math.min(4, numPages - 1);
  const targetStart = Math.max(currentPage - 2, 0);
  const targetEnd = Math.min(currentPage + 2, numPages - 1);
  const start = Math.min(targetStart, minStart);
  const end = Math.max(targetEnd, minEnd);
  for (let i = start; i <= end; i += 1) {
    pages.push(<FlatButton
      className={i === currentPage ? styles.currentPage : styles.page}
      onClick={i === currentPage ? () => {} : () => setCurrentPage(i)}
    >
      {i + 1}
    </FlatButton>);
  }
  pages.push(<FlatButton className={styles.page} onClick={() => setCurrentPage(numPages - 1)}>...{numPages}</FlatButton>);
  return pages;
};

const Pagination = ({
  currentPage,
  nextPage,
  prevPage,
  setCurrentPage,
  numPages,
}) => (numPages > 1 ? (
  <div className={styles.container}>
    <FlatButton className={styles.arrow} onClick={currentPage > 0 ? prevPage : () => {}}><Prev className={styles.arrow} /></FlatButton>
    {getPages({ currentPage, numPages, setCurrentPage })}
    <FlatButton className={styles.arrow} onClick={currentPage < (numPages - 1) ? nextPage : () => {}}><Next className={styles.arrow} /></FlatButton>
  </div>
) : (
  <span />
));

const mapDispatchToProps = (dispatch, {
  id,
}) => ({
  nextPage: () => dispatch(nextPage(id)),
  prevPage: () => dispatch(prevPage(id)),
  setCurrentPage: pageNumber => dispatch(setCurrentPage(id, pageNumber)),
});

export default connect(null, mapDispatchToProps)(Pagination);
