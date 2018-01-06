import React from 'react';
import Table from 'components/Table';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FixedTableWrapper = styled.div`
    position: relative;
    
    .baseTable {
        .innerContainer>div>div>table {
            margin-bottom: 0px;
        }
        .innerContainer>div>div:first-child>table>thead>tr>th:first-child {
            min-width: 188px;
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

const addVerticalScrollListener = () => {
  const tableBodyEl = document.querySelector('.baseTable .innerContainer>div>div:nth-child(2)');
  const heroTableEl = document.querySelector('.fixedTable .innerContainer>div>div:nth-child(2)');
  if (heroTableEl && tableBodyEl) {
    tableBodyEl.onscroll = () => {
      heroTableEl.scrollTop = tableBodyEl.scrollTop;
    };
  }
};

const addHorizontalScrollListener = () => {
  // TODO: add horizontal scroll for header
};

class FixedTable extends React.Component {
  componentDidUpdate() {
    addVerticalScrollListener();
    addHorizontalScrollListener();
  }

  render() {
    const {
      data, columns, fixedColumn, loading,
    } = this.props;
    return (
      <FixedTableWrapper>
        <div className="baseTable">
          <Table data={data} columns={columns} loading={loading} rootTable fixedHeader />
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
