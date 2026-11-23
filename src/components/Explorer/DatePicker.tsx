import React from "react";
import { TextField } from "@mui/material";

export function DatePicker(props: {
  id: string;
  label: string;
  value: string[];
  onChange: ({
    date,
  }: {
    date: Date | Date[] | undefined;
  }) => void;
}) {
  const rawValue = props.value?.[0] || "";
  const inputValue = /^\d{4}-\d{2}-\d{2}/.test(rawValue)
    ? rawValue.slice(0, 10)
    : "";

  return (
    <TextField
      size="small"
      type="date"
      sx={{ width: "250px" }}
      InputLabelProps={{ shrink: true }}
      onChange={(e) => {
        const val = e.target.value;
        if (!val) {
          props.onChange({ date: undefined });
          return;
        }
        const parsed = new Date(`${val}T00:00:00.000Z`);
        props.onChange({
          date: Number.isNaN(parsed.getTime()) ? undefined : parsed,
        });
      }}
      id={props.id}
      label={props.label}
      value={inputValue}
    />
  );
}

export default DatePicker;
