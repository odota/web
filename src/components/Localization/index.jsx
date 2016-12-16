import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { localization } from 'reducers';
import { setLocalization } from 'actions';
import lang, { langs } from 'lang';

const Localization = ({ localization, setLocalization }) => (
  <div>
    <SelectField
      floatingLabelText={lang.app_localization}
      value={localization}
      onChange={setLocalization}
    >
      {langs.map(lang => <MenuItem key={lang} value={lang} primaryText={lang} />)}
    </SelectField>

  </div>
);

const mapStateToProps = state => ({
  localization: localization(state),
});

const mapDispatchToProps = dispatch => ({
  setLocalization: (event, key, payload) => dispatch(setLocalization(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Localization);
