import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { DatePicker } from "./DatePicker";

type ExplorerFormFieldProps = {
  fields?: Record<string, any>;
  label: string;
  builderField: string;
  handleFieldUpdate: (
    builderField: string,
    value: string[] | undefined,
  ) => void;
  isDateField?: boolean;
  builder: Record<string, any[]>;
  chipLimit?: number;
  multipleSelect?: boolean;
};

class ExplorerFormField extends React.Component<ExplorerFormFieldProps> {
  autocomplete: any = undefined;
  constructor(props: ExplorerFormFieldProps) {
    super(props);
  }

  componentDidUpdate(newProps: ExplorerFormFieldProps) {
    if (this.autocomplete && this.autocomplete.state) {
      const { builderField, builder, fields } = newProps;
      const dataSource = fields && fields[builderField];
      const searchText = builder[builderField]
        ? (
            dataSource.find(
              (element: any) => element.key === builder[builderField],
            ) || {}
          ).text
        : "";
      if (searchText) {
        this.autocomplete.setState({
          searchText,
        });
      }
    }
  }

  addChip = (
    name: string,
    input: { label: string; id: string },
    limit: number,
  ) => {
    const currentChips: string[] = ([] as any[]).concat(
      this.props.builder[name] || [],
    );
    const newChips = currentChips.includes(input.id)
      ? currentChips
      : [input.id].concat(currentChips).slice(0, limit);
    // console.log(currentChips, input, newChips);
    this.props.handleFieldUpdate(name, newChips);
  };

  deleteChip = (name: string, index: number) => {
    const currentChips = ([] as any[]).concat(this.props.builder[name] || []);
    const newChips = [
      ...currentChips.slice(0, index),
      ...currentChips.slice(index + 1),
    ];
    this.props.handleFieldUpdate(name, newChips);
  };

  render() {
    const {
      fields,
      label,
      builderField,
      handleFieldUpdate,
      isDateField,
      builder,
      multipleSelect,
    } = this.props;
    const dataSource: { label: string; id: string }[] = (
      fields && fields[builderField]
    )?.map((d: any) => ({ label: d.text ?? d.value, id: d.key }));
    // const fieldWidth = 250;
    if (isDateField) {
      return (
        <DatePicker
          id={builderField}
          label={label}
          value={builder[builderField]}
          onChange={({ date }: { date: Date | Date[] | undefined }) => {
            const dateString = date && (date as Date).toISOString();
            handleFieldUpdate(
              builderField,
              dateString ? [dateString] : undefined,
            );
          }}
        />
      );
    }
    const chipList = ([] as any[])
      .concat(builder[builderField] || [])
      .map((id: string) => dataSource.find((d) => String(d.id) === String(id)))
      .filter(Boolean);
    const limit = multipleSelect ? 10 : 1;
    return (
      <Autocomplete
        multiple
        clearIcon={null}
        sx={{ width: "250px" }}
        value={chipList}
        fullWidth
        renderInput={(params) => <TextField {...params} label={label} />}
        renderValue={(value: any[], getItemProps) =>
          value.map((v, index) => {
            return (
              <Chip
                size="small"
                label={v.label}
                {...getItemProps({ index })}
                onDelete={() => {
                  this.deleteChip(builderField, index);
                }}
              />
            );
          })
        }
        openOnFocus
        options={dataSource}
        // onOpen={this.resetField}
        onChange={(event, value) => {
          // add the latest value
          this.addChip(builderField, value[value.length - 1], limit);
        }}
        size="small"
      />
    );
  }
}

export default ExplorerFormField;
