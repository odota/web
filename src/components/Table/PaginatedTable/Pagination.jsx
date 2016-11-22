import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Prev from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import {
  nextPage,
  prevPage,
  setCurrentPage,
} from 'actions';
import strings from 'lang';
import styles from './Pagination.css';

const getPages = ({
  currentPage,
  numPages,
  setCurrentPage,
}) => {
  // let i = currentPage - 4 > 0 ? currentPage - 4 : 0;
  const pages = [];
  const minStart = Math.max(numPages - 5, 0);
  const minEnd = Math.min(4, numPages - 1);
  const targetStart = Math.max(currentPage - 2, 0);
  const targetEnd = Math.min(currentPage + 2, numPages - 1);
  const start = Math.min(targetStart, minStart);
  const end = Math.max(targetEnd, minEnd);
  for (let i = start; i <= end; i += 1) {
    pages.push(<FlatButton
      key={i}
      className={i === currentPage ? styles.currentPage : styles.page}
      onClick={i === currentPage ? () => {} : () => setCurrentPage(i)}
    >
      {i + 1}
    </FlatButton>);
  }
  return pages;
};

const Pagination = ({
  currentPage,
  nextPage,
  prevPage,
  setCurrentPage,
  numPages,
  pageLength,
  length,
  place,
}) => numPages > 1 && (
  <div className={place === 'top' ? styles.containerTop : styles.container}>
    <div className={place === 'top' ? styles.paginationTop : styles.pagination}>
      {currentPage > 0 &&
        <FlatButton className={styles.page} onClick={() => setCurrentPage(0)}>
          {strings.pagination_first}
        </FlatButton>
      }
      <div className={styles.pages}>
        {currentPage > 0 &&
          <FlatButton className={styles.arrow} onClick={currentPage > 0 ? prevPage : () => {}}>
            <Prev className={styles.arrow} />
          </FlatButton>
        }
        {currentPage > 2 && numPages > 2 &&
          <FlatButton disabled className={styles.currentPage}>
            ...
          </FlatButton>
        }
        {getPages({ currentPage, numPages, setCurrentPage })}
        {numPages > currentPage + 3 &&
          <FlatButton disabled className={styles.currentPage}>
            ...
          </FlatButton>
        }
        {currentPage < numPages - 1 &&
          <FlatButton className={styles.arrow} onClick={currentPage < (numPages - 1) ? nextPage : () => {}}>
            <Next className={styles.arrow} />
          </FlatButton>
        }
      </div>
      {currentPage < numPages - 1 &&
        <FlatButton className={styles.page} onClick={() => setCurrentPage(numPages - 1)}>
          {strings.pagination_last}
        </FlatButton>
      }
    </div>
    {place === 'bot' &&
      <div className={styles.info}>
        {((pageLength * currentPage) + 1).toLocaleString('ru-RU')}
        {' - '}
        {Math.min((pageLength * currentPage) + pageLength, length).toLocaleString('ru-RU')} {strings.pagination_of} {length.toLocaleString('ru-RU')}
      </div>
    }
  </div>
);

const mapDispatchToProps = (dispatch, { id }) => ({
  nextPage: () => dispatch(nextPage(id)),
  prevPage: () => dispatch(prevPage(id)),
  setCurrentPage: pageNumber => dispatch(setCurrentPage(id, pageNumber)),
});

export default connect(null, mapDispatchToProps)(Pagination);
