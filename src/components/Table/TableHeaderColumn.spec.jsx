import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {
  testPropTypes,
  shallowWithMui,
  withMuiTheme,
} from 'test';

import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ContentSort from 'material-ui/svg-icons/content/sort';
import { TableHeaderColumn as MaterialTableHeaderColumn } from 'material-ui/Table';

// import styles from './Table.css';
import TableHeaderColumn from './TableHeaderColumn';

const MuiThemeHeaderColumn = withMuiTheme(TableHeaderColumn);
/* eslint no-unused-expressions: 0 */
describe('AppLogo tests', () => {
  const genProps = () => ({
    column: {
      field: 'test',
      displayFn: sinon.spy(),
      sortFn: true,
      tooltip: 'test',
      displayName: 'test',
    },
    sortState: 'test',
    sortField: 'test',
    sortClick: sinon.spy(),
  });

  // <MaterialTableHeaderColumn>
  //   <div
  //     className={column.sortFn ? styles.headerCell : styles.headerCellNoSort}
  //     onClick={() => column.sortFn && sortClick(column.field, sortState, column.sortFn)}
  //   >
  //     <div data-tip={column.tooltip && true} data-for={tooltipId} style={{ color: column.color }}>
  //       {column.displayName}
  //       {column.sortFn && getSortIcon(sortState, sortField, column.field, { height: 14, width: 14 })}
  //       {column.tooltip &&
  //       <ReactTooltip id={tooltipId} place="top" type="light" effect="solid">
  //         {column.tooltip}
  //       </ReactTooltip>
  //       }
  //     </div>
  //   </div>
  // </MaterialTableHeaderColumn>

  testPropTypes(TableHeaderColumn, genProps());

  describe('render tests', () => {
    // const shallowWithProps = () => {
    //   const props = genProps();
    //   return shallow(<TableHeaderColumn {...props} />);
    // };

    it('should render with sort icon', () => {
      const props = genProps();
      const ShallowTableHeaderColumn = shallow(<TableHeaderColumn {...props} />);
      const SortElement = ShallowTableHeaderColumn.find(MaterialTableHeaderColumn);
      expect(SortElement).to.exist;
    });

    it('should fire sortClick on click and change icon to the upward arrow', () => {
      const props = genProps();
      const ShallowTableHeaderColumn = shallowWithMui(<MuiThemeHeaderColumn {...props} />);
      const SortElement = ShallowTableHeaderColumn.find(MaterialTableHeaderColumn);

      SortElement.simulate('click');
      expect(props.sortClick).to.have.been.called;
      // console.log(ShallowTableHeaderColumn.context())
      // console.log(ShallowTableHeaderColumn.html())
      expect(ShallowTableHeaderColumn.find(NavigationArrowUpward)).to.exist;
      // SortElement.simulate('click');
      // expect(props.sortClick).to.have.been.called;
      // expect(ShallowTableHeaderColumn.find(NavigationArrowDownward)).to.exist;
    });

    it('should fire sortClick twice on 2 clicks and change icon to the downward arrow', () => {

    });
  });
});
