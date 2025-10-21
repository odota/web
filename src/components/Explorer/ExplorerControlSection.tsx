import React from 'react';
import Toggle from 'material-ui/Toggle';
import styled from 'styled-components';
import useStrings from '../../hooks/useStrings.hook';

const StyledDiv = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
  display: ${(props: { showEditor: boolean }) => (props.showEditor ? 'none' : 'flex')};
  flex-direction: row;
  flex-wrap: wrap;
`;

const ExplorerControlSection = ({
  showToggle,
  showEditor,
  toggleEditor,
  children,
}: { showToggle: boolean, showEditor: boolean, toggleEditor: (e: React.MouseEvent) => void, children: React.ReactNode }) => {
  const strings = useStrings();
  return <div>
    <div style={{ width: '180px', margin: '10px' }}>
      <div>{/* drawOmnibox(this, expandedFields) */}</div>
      {showToggle && (
        <Toggle
          label={strings.explorer_toggle_sql}
          defaultToggled={showEditor}
          onToggle={toggleEditor}
        />
      )}
    </div>
    <StyledDiv showEditor={showEditor}>{children}</StyledDiv>
    <div style={{ display: showEditor ? 'block' : 'none' }}>
      <div
        id="editor"
        style={{
          height: 100,
          width: '100%',
        }}
      />
    </div>
  </div>
};

export default ExplorerControlSection;
