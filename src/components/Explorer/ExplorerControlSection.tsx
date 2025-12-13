import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import useStrings from "../../hooks/useStrings.hook";

const ExplorerControlSection = ({
  showToggle,
  showEditor,
  toggleEditor,
  children,
}: {
  showToggle?: boolean;
  showEditor?: boolean;
  toggleEditor?: (e: React.ChangeEvent) => void;
  children: React.ReactNode;
}) => {
  const strings = useStrings();
  return (
    <div>
      <div style={{ width: "180px", margin: "10px" }}>
        <div>{/* drawOmnibox(this, expandedFields) */}</div>
        {showToggle && (
          <FormControlLabel
            control={
              <Switch defaultChecked={showEditor} onChange={toggleEditor} />
            }
            label={strings.explorer_toggle_sql}
          />
        )}
      </div>
      <div
        style={{
          display: showEditor ? "none" : "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {children}
      </div>
      <div style={{ display: showEditor ? "block" : "none" }}>
        <div
          id="editor"
          style={{
            height: 100,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default ExplorerControlSection;
