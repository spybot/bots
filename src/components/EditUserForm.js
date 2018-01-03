import React from 'react';
import {reduxForm, Field, formValues} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {TextField} from 'redux-form-material-ui';

const styles = {
  buttons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end'
  }
};

const EditUserForm = ({invalid, submitting, handleSubmit, avatarUrl}) => (
  <form onSubmit={handleSubmit}>
    {avatarUrl && (
      <Avatar
        src={avatarUrl}
        size={200}
      />
    )}

    <div>
      <Field
        name='name'
        component={TextField}
        floatingLabelText='Name'
        floatingLabelFixed
      />
    </div>

    <div>
      <Field
        name='avatarUrl'
        component={TextField}
        disabled
        floatingLabelText='Avatar URL'
        floatingLabelFixed
      />
    </div>

    <div style={styles.buttons}>
      <RaisedButton
        type='submit'
        label='Save'
        title='Save'
      />
    </div>
  </form>
);

export default reduxForm({
  form: 'editUserForm'
})(formValues('avatarUrl')(EditUserForm));