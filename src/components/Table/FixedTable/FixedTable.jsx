import React from 'react';
import Table from 'components/Table';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FixedTableWrapper = styled.div`
    position: relative;
    
    @media only screen and (max-width: 450px) {
      .fixedTable {
        width: auto !important;
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
    }

    .baseTable {
        .innerContainer>div>div>table {
            margin-bottom: 0px;
        }
        .innerContainer>div>div:first-child>table>thead>tr>th {
            min-width: 55px;
            &:first-child {
                min-width: 188px;
            }
        }
    }

    .fixedTable {
        position: absolute;
        top: 0px;
        overflow: hidden;
        width: 220px;
        .innerContainer>div>div>table {
            margin-bottom: 0px;
        }
        .innerContainer>div>div:nth-child(2) {
            overflow-y: hidden !important;
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
  componentDidUpdate() {
    addScrollListener();
  }

  render() {
    const {
      data, columns, fixedColumn, loading,
    } = this.props;
    return (
      <FixedTableWrapper>
        <div className="baseTable">
          <Table data={data} columns={columns} loading={loading} fixedHeader />
        </div>
        {
          !loading &&
          <div className="fixedTable">
            <Table data={data} columns={[fixedColumn]} loading={false} />
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
