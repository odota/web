import React from 'react';
import { connect } from 'react-redux';
import { form } from 'reducers';
import { withRouter } from 'react-router';
// import { clearForm } from 'actions';
import Form from './Form';
import FormField from './FormField';
import FormGroup from './FormGroup';
// import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';
import ShowFormToggle from './ShowFormToggle';
import styles from './TableFilterForm.css';
import * as data from './TableFilter.config';

const FORM_NAME = 'tableFilter';

// TODO localize strings
const TableFilterForm = ({ router, page, showForm }) => (
  <div>
    <ShowFormToggle page={page} formName={FORM_NAME} />
    <div className={showForm ? styles.showForm : styles.hideForm}>
      <Form name={FORM_NAME} className={styles.form}>
        <FormGroup className={styles.formGroup}>
          <FormField
            name="hero_id"
            label="Hero"
            dataSource={data.heroList}
            strict
            limit={1}
          />
          <FormField
            name="is_radiant"
            label="Team"
            dataSource={data.factionList}
            strict
            limit={1}
          />
          <FormField
            name="win"
            label="result"
            dataSource={data.resultList}
            strict
            limit={1}
          />
          <FormField
            name="lane_role"
            label="lane"
            dataSource={data.laneList}
            strict
            limit={1}
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <FormField
            name="patch"
            label="patch"
            dataSource={data.patchList}
            strict
            limit={1}
          />
          <FormField
            name="game_mode"
            label="game mode"
            dataSource={data.modeList}
            strict
            limit={1}
          />
          <FormField
            name="lobby_type"
            label="lobby type"
            dataSource={data.lobbyTypeList}
            strict
            limit={1}
          />
          <FormField
            name="date"
            label="date"
            dataSource={data.dateList}
            strict
            limit={1}
          />
          <FormField
            name="region"
            label="region"
            dataSource={data.regionList}
            strict
            limit={1}
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <FormField
            name="with_hero_id"
            label="Allied Heroes"
            dataSource={data.heroList}
            strict
            limit={5}
          />
          <FormField
            name="against_hero_id"
            label="Opposing Heroes"
            dataSource={data.heroList}
            strict
            limit={5}
          />
          <FormField
            name="included_account_id"
            label="Included Players"
            limit={10}
          />
          <FormField
            name="excluded_account_id"
            label="Excluded Players"
          />
        </FormGroup>
        {/*
        <FormGroup className={styles.formGroup}>
          <FormField
            name="limit"
            label="number of matches"
            limit={1}
          />
        </FormGroup>
        // TODO sort (order by descending, might be tricky due to being a string input)
        */}
      </Form>
      <div className={styles.buttonContainer}>
        <ClearButton label="reset the thing" clearForm={() => router.push({ pathname: window.location.pathname })} style={{ marginRight: 10 }} />
        {/* <SubmitButton
          label="do the thing"
          submitForm={() => {}}
        />*/}
      </div>
    </div>
  </div>
);

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  showForm: form.getFormShow(state, 'tableFilter'),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableFilterForm));
