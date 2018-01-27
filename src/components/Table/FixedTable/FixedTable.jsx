import React from 'react';
import Table from 'components/Table';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FixedTableWrapper = styled.div`
    position: relative;
    
    @media only screen and (max-width: 450px) {
      .fixedTable {
        width: 85px;
        margin-left: -30px;
        padding-left: 30px;
      }
      .fixedTable, .baseTable {
        .textContainer {
          display: none;
        }
        .innerContainer>div>div:first-child>table>thead>tr>th:first-child {
          min-width: 55px !important;
        }
      }
      .baseTable {
        .innerContainer>div>div:first-child>table>thead>tr>th {
          &:nth-child(2) {
            padding-left: 27px !important;
          } 
        }
      }
    }
    
    @media only screen and (max-width: 960px) and (min-width:450px) {
      .fixedTable {
        width: 195px;
        margin-left: -25px;
        padding-left: 25px;
      }
    }

    @media only screen and (min-width: 960px) {
      .fixedTable {
        width: 220px;
      }
    }

    .baseTable {
        .innerContainer>div>div>table {
            margin-bottom: 0px;
            &>tbody>tr>td:nth-child(n+1) {
              min-width: 74px;
            }
        }
        .innerContainer>div>div:first-child>table>thead>tr>th {
            min-width: 74px;
            &:first-child {
                min-width: 188px;
            }
            &:last-child {
              padding-right: 39px !important;
            }
        }
    }

    .fixedTable {
        position: absolute;
        top: 0px;
        overflow: hidden;
        .innerContainer>div>div>table {
            margin-bottom: 0px;
        }
        .innerContainer>div>div:nth-child(2) {
            overflow-y: hidden !important;
            overflow-x: scroll !important;
            margin-bottom: -15px;
        }
    }
`;

const addScrollListener = () => {
  const tableBodyEl = document.querySelector('.baseTable .innerContainer>div>div:nth-child(2)');
  const heroTableEl = document.querySelector('.fixedTable .innerContainer>div>div:nth-child(2)');
  const fixedHeaderTableEl = document.querySelector('.baseTable .innerContainer>div>div:nth-child(1)');
  if (heroTableEl && tableBodyEl) {
    tableBodyEl.onscroll = () => {
      heroTableEl.scrollTop = tableBodyEl.scrollTop;
      fixedHeaderTableEl.scrollLeft = tableBodyEl.scrollLeft;
    };
  }
};

class FixedTable extends React.Component {
  constructor() {
    super();
    this.onSortCallback = this.onSortCallback.bind(this);
  }

  componentDidMount() {
    addScrollListener();
  }

  componentDidUpdate() {
    addScrollListener();
  }

  onSortCallback(sortField, sortState, sortFn) {
    this.fixedHeroColumn.sortClick(sortField, sortState, sortFn);
  }

  render() {
    const {
      data, columns, fixedColumn, loading,
    } = this.props;
    return (
      <FixedTableWrapper>
        <div className="baseTable">
          <Table data={data} columns={columns} loading={loading} fixedHeader onSortCallback={this.onSortCallback} />
        </div>
        {
          !loading &&
          <div className="fixedTable">
            <Table data={data} columns={[fixedColumn]} loading={false} ref={(fixedHeroColumn) => { this.fixedHeroColumn = fixedHeroColumn; }} />
          </div>
        }
      </FixedTableWrapper>
    );
  }
}

const {
  arrayOf,
  bool,
  shape,
} = PropTypes;

FixedTable.propTypes = {
  data: arrayOf(shape({})).isRequired,
  columns: arrayOf(shape({})).isRequired,
  fixedColumn: shape({}),
  loading: bool,
};

export default FixedTable;
