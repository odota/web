import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import styled from 'styled-components';
import ExplorerFormField from 'components/Explorer/ExplorerFormField';

const StyledDiv = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
  display: ${props => (props.showEditor ? 'none' : 'flex')};
  flex-direction: row;
  flex-wrap: wrap;
`;

const ExplorerControlSection = ({
  expandedFields, handleFieldUpdate, builder,
}) => (
  <div>
    <StyledDiv>
      <ExplorerFormField label={strings.explorer_group_by} fields={expandedFields} builderField="group" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      <ExplorerFormField label={strings.explorer_min_mmr} fields={expandedFields} builderField="minMmr" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      <ExplorerFormField label={strings.explorer_max_mmr} fields={expandedFields} builderField="maxMmr" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      <ExplorerFormField label={strings.explorer_hero} fields={expandedFields} builderField="hero" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      <ExplorerFormField label={strings.explorer_side} fields={expandedFields} builderField="side" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      <ExplorerFormField label={strings.th_result} fields={expandedFields} builderField="result" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      <ExplorerFormField label={strings.explorer_min_duration} fields={expandedFields} builderField="minDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      <ExplorerFormField label={strings.explorer_max_duration} fields={expandedFields} builderField="maxDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
      {/* <ExplorerFormField label={strings.explorer_min_date} builderField="minDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField /> */}
      {/* <ExplorerFormField label={strings.explorer_max_date} builderField="maxDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField /> */}
      {/* <ExplorerFormField label={strings.explorer_order} fields={expandedFields} builderField="order" handleFieldUpdate={handleFieldUpdate} builder={builder} />*/}
      {/* <ExplorerFormField label={strings.explorer_having} fields={expandedFields} builderField="having" handleFieldUpdate={handleFieldUpdate} builder={builder} /> */}
      {/* <ExplorerFormField label={strings.explorer_limit} fields={expandedFields} builderField="limit" handleFieldUpdate={handleFieldUpdate} builder={builder} /> */}
    </StyledDiv>
  </div>);

ExplorerControlSection.propTypes = {
  expandedFields: PropTypes.arrayOf({}),
  handleFieldUpdate: PropTypes.func,
  builder: PropTypes.func,
};

export default ExplorerControlSection;
