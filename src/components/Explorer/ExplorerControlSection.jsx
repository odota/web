import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import Toggle from 'material-ui/Toggle';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
  display: ${props => (props.showEditor ? 'none' : 'flex')};
  flex-direction: row;
  flex-wrap: wrap;
`;

const ExplorerControlSection = ({
  showToggle, showEditor, toggleEditor, children,
}) => (
  <div>
    <div style={{ width: '180px', margin: '10px' }}>
      <div>{/* drawOmnibox(this, expandedFields) */}</div>
      {showToggle && <Toggle
        label={strings.explorer_toggle_sql}
        defaultToggled={showEditor}
        onToggle={toggleEditor}
      />}
    </div>
    <StyledDiv showEditor={showEditor}>
      {children}
    </StyledDiv>
    <div style={{ display: showEditor ? 'block' : 'none' }}>
      <div
        id="editor"
        style={{
        height: 100,
        width: '100%',
      }}
      />
    </div>
  </div>);

ExplorerControlSection.propTypes = {
  showToggle: PropTypes.bool,
  showEditor: PropTypes.bool,
  toggleEditor: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default ExplorerControlSection;
