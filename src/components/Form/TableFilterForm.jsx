import React from 'react';
import { connect } from 'react-redux';
import { toggleShowForm } from 'actions';
import { form } from 'reducers';
import strings from 'lang';
// import { clearForm } from 'actions';
import Form from './Form';
import FormField from './FormField';
import FormGroup from './FormGroup';
// import SubmitButton from './SubmitButton';
import ShowFormToggle from './ShowFormToggle';
import styles from './TableFilterForm.css';
import * as data from './TableFilter.config';

const FORM_NAME = 'tableFilter';

class TableFilterForm extends React.Component {
  componentWillMount() {
    if (Boolean(window.location.search.substring(1)) && !this.props.showForm) {
      this.props.toggleShowForm();
    }
  }
  render() {
    const { page, showForm, toggleShowForm } = this.props;
    return (
      <div>
        <ShowFormToggle page={page} formName={FORM_NAME} showForm={showForm} toggleShowForm={toggleShowForm} />
        <div className={showForm ? styles.showForm : styles.hideForm}>
          <Form name={FORM_NAME} className={styles.form}>
            <FormGroup className={styles.formGroup}>
              <FormField
                name="hero_id"
                label={strings.filter_hero_id}
                dataSource={data.heroList}
                strict
                limit={1}
              />
              <FormField
                name="is_radiant"
                label={strings.filter_is_radiant}
                dataSource={data.factionList}
                strict
                limit={1}
              />
              <FormField
                name="win"
                label={strings.filter_win}
                dataSource={data.resultList}
                strict
                limit={1}
              />
              <FormField
                name="lane_role"
                label={strings.filter_lane_role}
                dataSource={data.laneList}
                strict
                limit={1}
              />
            </FormGroup>
            <FormGroup className={styles.formGroup}>
              <FormField
                name="patch"
                label={strings.filter_patch}
                dataSource={data.patchList}
                strict
                limit={1}
              />
              <FormField
                name="game_mode"
                label={strings.filter_game_mode}
                dataSource={data.modeList}
                strict
                limit={1}
              />
              <FormField
                name="lobby_type"
                label={strings.filter_lobby_type}
                dataSource={data.lobbyTypeList}
                strict
                limit={1}
              />
              <FormField
                name="date"
                label={strings.filter_date}
                dataSource={data.dateList}
                strict
                limit={1}
              />
              <FormField
                name="region"
                label={strings.filter_region}
                dataSource={data.regionList}
                strict
                limit={1}
              />
            </FormGroup>
            <FormGroup className={styles.formGroup}>
              <FormField
                name="with_hero_id"
                label={strings.filter_with_hero_id}
                dataSource={data.heroList}
                strict
                limit={5}
              />
              <FormField
                name="against_hero_id"
                label={strings.filter_against_hero_id}
                dataSource={data.heroList}
                strict
                limit={5}
              />
              <FormField
                name="included_account_id"
                label={strings.filter_included_account_id}
                limit={10}
              />
              <FormField
                name="excluded_account_id"
                label={strings.filter_excluded_hero_id}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showForm: form.getFormShow(state, 'tableFilter'),
});

const mapDispatchToProps = dispatch => ({
  toggleShowForm: () => dispatch(toggleShowForm('tableFilter')),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableFilterForm);
