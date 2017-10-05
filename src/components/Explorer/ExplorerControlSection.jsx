import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import Toggle from 'material-ui/Toggle';
import styled from 'styled-components';
import ExplorerFormField from './ExplorerFormField';

const StyledDiv = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
  display: ${props => (props.showEditor ? 'none' : 'flex')};
  flex-direction: row;
  flex-wrap: wrap;
`;

const ExplorerControlSection = ({ showEditor, toggleEditor, expandedFields, handleFieldUpdate, builder }) => (<div>
  <div style={{ width: '180px', margin: '10px' }}>
    <div>{/* drawOmnibox(this, expandedFields) */}</div>
    <Toggle
      label={strings.explorer_toggle_sql}
      defaultToggled={showEditor}
      onToggle={toggleEditor}
    />
  </div>
  <StyledDiv showEditor={showEditor}>
    <ExplorerFormField label={strings.explorer_select} fields={expandedFields} builderField="select" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_group_by} fields={expandedFields} builderField="group" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_hero} fields={expandedFields} builderField="hero" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_player} fields={expandedFields} builderField="player" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_team} fields={expandedFields} builderField="team" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_organization} fields={expandedFields} builderField="organization" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_league} fields={expandedFields} builderField="league" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_tier} fields={expandedFields} builderField="tier" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_region} fields={expandedFields} builderField="region" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_side} fields={expandedFields} builderField="side" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.th_result} fields={expandedFields} builderField="result" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField
      label={strings.explorer_player_purchased}
      fields={expandedFields}
      builderField="playerPurchased"
      handleFieldUpdate={handleFieldUpdate}
      builder={builder}
    />
    <ExplorerFormField label={strings.explorer_lane_role} fields={expandedFields} builderField="laneRole" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_min_patch} fields={expandedFields} builderField="minPatch" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_max_patch} fields={expandedFields} builderField="maxPatch" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_min_duration} fields={expandedFields} builderField="minDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_max_duration} fields={expandedFields} builderField="maxDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_min_date} builderField="minDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField />
    <ExplorerFormField label={strings.explorer_max_date} builderField="maxDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField />
    <ExplorerFormField label={strings.explorer_order} fields={expandedFields} builderField="order" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_having} fields={expandedFields} builderField="having" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={strings.explorer_limit} fields={expandedFields} builderField="limit" handleFieldUpdate={handleFieldUpdate} builder={builder} />
    <ExplorerFormField label={'Is TI7 Team'} fields={expandedFields} builderField="isTi7Team" handleFieldUpdate={handleFieldUpdate} builder={builder} />
  </StyledDiv>
  <div style={{ display: showEditor ? 'block' : 'none' }}>
    <div
      id={'editor'}
      style={{
        height: 100,
        width: '100%',
      }}
    />
  </div>
</div>);

ExplorerControlSection.propTypes = {
  showEditor: PropTypes.bool,
  toggleEditor: PropTypes.func,
  expandedFields: PropTypes.arrayOf({}),
  handleFieldUpdate: PropTypes.func,
  builder: PropTypes.func,
};

export default ExplorerControlSection;
