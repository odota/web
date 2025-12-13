import React from "react";
import { Chip } from "@mui/material";

const ChipList = ({
  chipList,
  deleteChip,
  name,
  history,
}: {
  chipList: { label: string; id: number }[];
  deleteChip: Function;
  name: string;
  history: any;
}) => (
  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
    {chipList.map((chip, index) => (
      <Chip
        size="small"
        // style={{ margin: '0 5px 5px 0' }}
        key={chip.id}
        label={chip.label}
        onDelete={() => deleteChip(name, index, history)}
      />
    ))}
  </div>
);

export default ChipList;
