import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Prev from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import constants from '../../constants';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.top ? 'flex-end' : 'center')};
  ${props => (props.top && `position:relative;
  @media only screen and (max-width: 767px) {
    align-items: center;
  }
  `)};
`;
const StyledPagination = styled.div`
 display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  & > div {
    display: flex;
  }
  @media only screen and (max-width: 511px) {
    flex-direction: column;
  }
  ${props => props.top && `position: absolute;
  right: 0;
  top: -32px;
  font-size: ${constants.fontSizeMedium};
  @media only screen and (max-width: 767px) {
    position: initial;
  }
  `}
`;
const pageStyle = `
  color: ${constants.primaryLinkColor}!important;
  min-width: 20px !important;
  padding: 0 10px !important;
  margin: 0 2px !important;
  @media only screen and (max-width: 511px) {
    /* Override material-ui */
    min-width: 14px !important;
    padding: 0 6px !important;
    margin: 0 1px !important; 
  }
`;
const StyledPage = styled(FlatButton)`
${pageStyle}
`;
const arrowStyle = `
  vertical-align: text-top;

  /* Override material-ui */
  color:${constants.colorYelor} !important;
  padding: 0 !important;`;
const StyledArrowButton = styled(FlatButton)`
  min-width: 20px !important;
${arrowStyle}
`;
const StyledPrev = styled(Prev)`
${arrowStyle}
`;
const StyledNext = styled(Next)`
${arrowStyle}
`;
const StyledCurrentPage = styled(FlatButton)`
 ${pageStyle}

  /* Override material-ui */
  color:${constants.colorMutedLight} !important;
  pointer-events: none;
`;
const StyledInfo = styled.div`
  font-size: ${constants.fontSizeMedium};
  color: ${constants.colorMutedLight};
`;


const getPages = ({ currentPage, numPages, setCurrentPage }) => {
  // let i = currentPage - 4 > 0 ? currentPage - 4 : 0;
  const pages = [];
  const minStart = Math.max(numPages - 5, 0);
  const minEnd = Math.min(4, numPages - 1);
  const targetStart = Math.max(currentPage - 2, 0);
  const targetEnd = Math.min(currentPage + 2, numPages - 1);
  const start = Math.min(targetStart, minStart);
  const end = Math.max(targetEnd, minEnd);
  for (let i = start; i <= end; i += 1) {
    pages.push(i === currentPage ?
      <StyledCurrentPage
        key={i}
        onClick={i === currentPage ? () => {} : () => setCurrentPage(i)}
      >
        {i + 1}
      </StyledCurrentPage> :
      <StyledPage
        key={i}
        onClick={i === currentPage ? () => {} : () => setCurrentPage(i)}
      >
        {i + 1}
      </StyledPage>);
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
  strings,
}) =>
  numPages > 1 && (
    <StyledContainer top={place === 'top'}>
      <StyledPagination top={place === 'top'}>
        {currentPage > 0 &&
        <StyledPage onClick={() => setCurrentPage(0)}>
          {strings.pagination_first}
        </StyledPage>
        }
        <div>
          {currentPage > 0 &&
          <StyledArrowButton onClick={currentPage > 0 ? prevPage : () => {}}>
            <StyledPrev />
          </StyledArrowButton>
          }
          {currentPage > 2 && numPages > 2 &&
          <StyledCurrentPage disabled>
            ...
          </StyledCurrentPage>
          }
          {getPages({ currentPage, numPages, setCurrentPage })}
          {numPages > currentPage + 3 &&
          <StyledCurrentPage disabled>
            ...
          </StyledCurrentPage>
          }
          {currentPage < numPages - 1 &&
          <StyledArrowButton onClick={currentPage < (numPages - 1) ? nextPage : () => {}}>
            <StyledNext />
          </StyledArrowButton>
          }
        </div>
        {currentPage < numPages - 1 &&
        <StyledPage onClick={() => setCurrentPage(numPages - 1)}>
          {strings.pagination_last}
        </StyledPage>
        }
      </StyledPagination>
      {place === 'bot' &&
      <StyledInfo>
        {((pageLength * currentPage) + 1).toLocaleString('en-US')}
        {' - '}
        {Math.min((pageLength * currentPage) + pageLength, length).toLocaleString('en-US')} {strings.pagination_of} {length.toLocaleString('en-US')}
      </StyledInfo>
      }
    </StyledContainer>
  );

const mapStateToProps = state => ({
  strings: state.app.strings,
});

const mapDispatchToProps = () => ({
  /*
  nextPage: () => dispatch(nextPage(id)),
  prevPage: () => dispatch(prevPage(id)),
  setCurrentPage: pageNumber => dispatch(setCurrentPage(id, pageNumber)),
  */
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
