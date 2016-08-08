import React from 'react';
import { connect } from 'react-redux';
import { nextPage, prevPage, setCurrentPage } from '../../../actions';
import styles from './Pagination.css';

const getPages = ({ currentPage, numPages, setCurrentPage }) => {
  let i = currentPage - 4 > 0 ? currentPage - 4 : 0;
  const pages = [];
  if (currentPage + 5 >= 10) {
    pages.push(<span className={styles.page} onClick={() => setCurrentPage(0)}>1...</span>);
  }
  while (i < numPages && pages.length < 9) {
    const page = i;
    let PageNumber;
    if (page === currentPage) {
      PageNumber = <span className={styles.currentPage}>{page + 1}</span>;
    } else {
      PageNumber = (
        <span
          className={styles.page}
          onClick={() => setCurrentPage(page)}
        >
          {page + 1}
        </span>
      );
    }
    pages.push(PageNumber);
    i++;
  }
  if (currentPage <= numPages - 5) {
    pages.push(<span className={styles.page} onClick={() => setCurrentPage(numPages - 1)}>...{numPages}</span>);
  }
  return pages;
};

const Pagination = ({ currentPage, nextPage, prevPage, setCurrentPage, numPages }) => (numPages > 1 ? (
  <div className={styles.container}>
    <div onClick={prevPage} className={styles.page}>{'<'}</div>
    {getPages({ currentPage, numPages, setCurrentPage })}
    <div onClick={nextPage} className={styles.page}>{'>'}</div>
  </div>
) : (
  <span></span>
));

const mapDispatchToProps = (dispatch, { id }) => ({
  nextPage: () => dispatch(nextPage(id)),
  prevPage: () => dispatch(prevPage(id)),
  setCurrentPage: (pageNumber) => dispatch(setCurrentPage(id, pageNumber)),
});

export default connect(null, mapDispatchToProps)(Pagination);
