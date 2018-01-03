// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadUserRequest, updateUserRequest} from 'actions';
import {getUser} from 'reducers/users';
import type User from 'types';

import EditUserForm from 'components/EditUserForm';

type Props = {
  userInfo: User,
  isLoading: boolean,
  match: {
    params: {
      userId: string
    }
  }
}

class UserPage extends Component<Props> {
  componentWillMount() {
    const {
      match: {
        params: {
          userId
        }
      },
      userInfo,
      isLoading,
      loadUserRequest
    } = this.props;

    if (!userInfo && !isLoading) {
      loadUserRequest(userId);
    }
  }

  handleSubmit = data => {
    const {
      match: {
        params: {
          userId
        }
      },
      updateUserRequest
    } = this.props;

    updateUserRequest(userId, data);
  };

  render() {
    const {
      userInfo
    } = this.props;

    if (!userInfo) {
      return <span>Loading...</span>
    }

    return (
      <div>
        <h1>Edit user</h1>

        <EditUserForm
          initialValues={userInfo}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect((state, {match: {params: {userId}}}: Props) => ({
  userInfo: getUser(state, userId)
}), {
  loadUserRequest,
  updateUserRequest
})(UserPage);

