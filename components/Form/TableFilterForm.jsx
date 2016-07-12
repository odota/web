import React from 'react';
import Form from './Form';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';
import styles from './TableFilterForm.css';
import constants from '../../constants';
import { connect } from 'react-redux';
import { submitForm, clearForm } from '../../actions';

const heroConfig = {
  text: 'localized_name',
  value: 'id',
};
const genericConfig = {
  text: 'text',
  value: 'id',
};

// This has to be a list in order to pass it in.
// We should consider refactoring all these kinds of objects into lists. I understand
// they are probably built like this to allow map key access but it would be nice if I didn't
// have to convert them all into arrays.
const heroList = Object.keys(constants.heroes).map(id => ({
  ...constants.heroes[id],
}));
const laneList = Object.keys(constants.lane_ids).map(id => ({
  text: constants.lane_ids[id],
  id: Number(id),
}));
const patchList = constants.patch.map((patch, index) => ({
  text: patch.name,
  id: index,
}));
const modeList = Object.keys(constants.game_mode).map(id => ({
  text: constants.game_mode[id].name,
  id,
}));
const lobbyTypeList = Object.keys(constants.lobby_type).map(id => ({
  text: constants.lobby_type[id].name,
  id,
}));
const regionList = Object.keys(constants.region).map(id => ({
  text: constants.region[id],
  id: Number(id),
}));

const factionList = [{
  text: 'dire',
  id: 0,
}, {
  text: 'radiant',
  id: 1,
}];
const resultList = [{
  text: 'loss',
  id: 0,
}, {
  text: 'win',
  id: 1,
}];
const dateList = [{
  text: 'last week',
  id: 7,
}, {
  text: 'last month',
  id: 30,
}, {
  text: 'last 3 months',
  id: 90,
}, {
  text: 'last 6 months',
  id: 180,
}];

const TableFilterForm = ({ submitForm, clearForm }) => (
  <Form name="tableFilter" className={styles.form}>
    <FormField
      name="withHeroId"
      label="your team had these heroes"
      dataSource={heroList}
      dataSourceConfig={heroConfig}
      className={styles.field}
      strict
    />
    <FormField
      name="againstHeroId"
      label="their team had these heroes"
      dataSource={heroList}
      dataSourceConfig={heroConfig}
      className={styles.field}
      strict
    />
    <FormField
      name="includedAccountId"
      label="included these players"
      className={styles.field}
    />
    <FormField
      name="excludedAccountId"
      label="excluded these players"
      className={styles.field}
    />
    <FormField
      name="heroId"
      label="your hero"
      dataSource={heroList}
      dataSourceConfig={heroConfig}
      className={styles.field}
      strict
    />
    <FormField
      name="isRadiant"
      label="faction"
      dataSource={factionList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      strict
    />
    <FormField
      name="win"
      label="result"
      dataSource={resultList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      strict
    />
    <FormField
      name="laneRole"
      label="lane"
      dataSource={laneList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      strict
    />
    <FormField
      name="patch"
      label="patch"
      dataSource={patchList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      maxSearchResults={100}
      strict
    />
    <FormField
      name="gameMode"
      label="game mode"
      dataSource={modeList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      maxSearchResults={100}
      strict
    />
    <FormField
      name="lobbyType"
      label="lobby type"
      dataSource={lobbyTypeList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      maxSearchResults={100}
      strict
    />
    <FormField
      name="date"
      label="date"
      dataSource={dateList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      strict
      limit={1}
    />
    <FormField
      name="region"
      label="region"
      dataSource={regionList}
      dataSourceConfig={genericConfig}
      className={styles.field}
      strict
    />
    <FormField
      name="limit"
      label="number of matches"
      className={styles.field}
      limit={1}
    />
    <div className={styles.buttonContainer}>
      <ClearButton label="reset the thing" clearForm={clearForm} style={{ marginRight: 10 }} />
      <SubmitButton label="do the thing" submitForm={submitForm} />
    </div>
  </Form>
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitForm: () => dispatch(submitForm(ownProps.submitAction.bind(null, ownProps.id), 'tableFilter')),
  clearForm: () => dispatch(clearForm('tableFilter')),
});

export default connect(null, mapDispatchToProps)(TableFilterForm);
