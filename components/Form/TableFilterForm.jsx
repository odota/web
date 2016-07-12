import React from 'react';
import Form from './Form';
import FormField from './FormField';
import styles from './TableFilterForm.css';
import constants from '../../constants';
import { connect } from 'react-redux';

const heroConfig = {
  text: 'localized_name',
  value: 'id',
};

// This has to be a list in order to pass it in.
// We should consider refactoring all these kinds of objects into lists. I understand
// they are probably built like this to allow map key access but it would be nice if I didn't
// have to convert them all into arrays.
const heroList = Object.keys(constants.heroes).map(id => ({
  ...constants.heroes[id],
}));

// const mapStateToProps = (state, ownProps) => ({
//
// });

export default () => (
  <Form name="tableFilter">
    <FormField
      name="withHeroId"
      label="your team had these heroes"
      dataSource={heroList}
      dataSourceConfig={heroConfig}
      className={styles.formField}
      strict
    />
    <FormField
      name="againstHeroId"
      label="their team had these heroes"
      dataSource={heroList}
      dataSourceConfig={heroConfig}
      className={styles.formField}
      strict
    />
    <FormField
      name="includedAccountId"
      label="included these players"
      className={styles.formField}
    />
    <FormField
      name="excludedAccountId"
      label="excluded these players"
      className={styles.formField}
    />

  </Form>
);

// ?with_hero_id=1
// &with_hero_id=2
// &against_hero_id=1
// &included_account_id=1234567898
// &excluded_account_id=12345678
// &hero_id=1
// &is_radiant=1
// &win=1
// &lane_role=1
// &patch=18
// &game_mode=0
// &lobby_type=5
// &date=7
// &region=2
// &desc=kills
// &limit=1000000
