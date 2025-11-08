import React from 'react';
import { connect } from 'react-redux';
import { Autocomplete, Chip, TextField } from '@mui/material';
import querystring from 'querystring';
// import ChipList from './ChipList';
// import constants from '../constants';

const addChipToUrl = (
  name: string,
  input: { label: string; id: string | number } | undefined | null,
  limit?: number,
  history?: any,
) => {
  if (history) {
    const query = querystring.parse(window.location.search.substring(1));
    const field = ([input?.id] as any[])
      .concat(query[name] || [])
      .slice(0, limit);
    const newQuery = {
      ...query,
      [name]: field,
    };
    history.push(
      `${window.location.pathname}?${querystring.stringify(newQuery)}`,
    );
  }
};

const deleteChipFromUrl = (name: string, index: number, history?: any) => {
  if (history) {
    const query = querystring.parse(window.location.search.substring(1));
    const field = ([] as any[]).concat(query[name] || []);
    const newQuery = {
      ...query,
      [name]: [...field.slice(0, index), ...field.slice(index + 1)],
    };
    if (!newQuery[name]?.length) {
      delete newQuery[name];
    }
    history.push(
      `${window.location.pathname}?${querystring.stringify(newQuery)}`,
    );
  }
};

type FormFieldProps = {
  name: string;
  dataSource: { label: string; id: number }[];
  strict?: boolean;
  limit?: number;
  formSelectionState: any;
  addChip?: (name: string, value: any, limit?: number) => void;
  deleteChip?: (name: string, index: number) => void;
  history?: any;
  label: string;
  className?: string;
  maxSearchResults?: number;
  strings: Strings;
  resetField?: Function;
  textFieldStyle?: any;
  size?: 'small' | 'medium';
  width?: number;
};

class FormField extends React.Component<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super(props);
  }

  handleSelect = (
    e: React.SyntheticEvent,
    value: string[] | { label: string; id: string | number }[],
  ) => {
    const { name, limit, addChip, history } = this.props;

    let valueToAdd;
    if (typeof value[0] === 'string') {
      // free input mode
      valueToAdd = {
        label: value[0],
        id: value[0],
      };
    } else {
      // Add the latest value
      valueToAdd = value?.[value.length - 1] as {
        label: string;
        id: string | number;
      };
    }
    addChipToUrl(name, valueToAdd, limit, history);
    addChip && addChip(name, valueToAdd, limit);
  };

  findFromSource = (element: any) => {
    let fromSource = this.props.dataSource.find(
      (data) => Number(data.id) === Number(element),
    );
    fromSource =
      fromSource || this.props.dataSource.find((data) => data.id === element);
    return fromSource || { label: element, id: element };
  };

  render() {
    const {
      name,
      label,
      dataSource = [],
      className,
      maxSearchResults = 150,
      history,
      formSelectionState,
    } = this.props;
    const selectedElements: number[] = [].concat(
      formSelectionState[name] || [],
    );
    // Use dataSource on selectedElements to hydrate the chipList
    const chipList = selectedElements.map(this.findFromSource);
    return (
      <div className={className}>
        <Autocomplete
          clearIcon={null}
          sx={{ width: this.props.width ? `${this.props.width}px` : undefined }}
          size={this.props.size ?? 'medium'}
          freeSolo={!this.props.strict}
          multiple={true}
          value={chipList}
          getOptionLabel={(option: any) => option.label}
          renderInput={(params) => <TextField {...params} label={label} />}
          renderValue={(value: any[], getItemProps) =>
            value.map((v, index) => {
              return (
                <Chip
                  size={this.props.size}
                  label={v.label}
                  {...getItemProps({ index })}
                  onDelete={(e) => {
                    deleteChipFromUrl(name, index, history);
                    this.props.deleteChip && this.props.deleteChip(name, index);
                  }}
                />
              );
            })
          }
          openOnFocus
          options={dataSource}
          onChange={this.handleSelect}
        />
        {/* <ChipList
          name={name}
          chipList={chipList}
          deleteChip={deleteChip}
          history={history}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(FormField);
