import React from 'react';
import Form from './Form';
import FormField from './FormField';
import styles from './TableFilterForm.css';

const config = {
  text: 'name',
  value: 'id',
};

const heroList = [{
  name: 'axe',
  id: 12345,
}, {
  name: 'anti mage',
  id: 45678,
}, {
  name: 'pudge',
  id: 24938,
}];

export default () => (
  <Form name="tableFilter">
    <FormField
      name="withHeroId"
      label="with hero"
      dataSource={heroList}
      dataSourceConfig={config}
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
