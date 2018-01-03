// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {map} from 'lodash';

import type {User} from 'types';
import {loadUserListRequest, loadNextPage, loadPreviousPage} from 'actions';
import {getUsers, isUsersLoaded, isUsersLoading, isNextPageAvailable, isPreviousPageAvailable} from 'reducers/users';

type Props = {
  isLoading: boolean,
  isLoaded: boolean,
  showNext: boolean,
  showPrevious: boolean,
  users: {
    [string]: User
  }
};

class UsersPage extends Component<Props> {
  constructor({isLoading, isLoaded, loadUserListRequest}) {
    super();

    if (!isLoading && !isLoaded) {
      loadUserListRequest();
    }
  }

  handleNextPageClick = () => {
    this.props.loadNextPage();
  };

  handlePreviousPageClick = () => {
    this.props.loadPreviousPage();
  };

  render() {
    const {
      users,
      isLoading,
      isLoaded,
      showNext,
      showPrevious
    } = this.props;

    return (
      <div>
        <h1>Users</h1>

        {isLoading && <span>Loading...</span>}

        {isLoaded && (
          <div>
            <List>
              {map(users, ({id, name, avatarUrl}) => (
                <Link
                  key={id}
                  to={`/users/${id}`}
                >
                  <ListItem
                    primaryText={name}
                    title={name}
                    leftAvatar={avatarUrl? <Avatar src={avatarUrl} /> : <Avatar>{name.substr(0, 1)}</Avatar>}
                  />
                </Link>
              ))}
            </List>

            <div>
              {showPrevious && (
                <FlatButton
                  label='Previous'
                  title='Previous'
                  onClick={this.handlePreviousPageClick}
                />
              )}

              {showNext && (
                <FlatButton
                  label='Next'
                  title='Next'
                  onClick={this.handleNextPageClick}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default connect(state => ({
  users: getUsers(state),
  isLoading: isUsersLoading(state),
  isLoaded: isUsersLoaded(state),
  showNext: isNextPageAvailable(state),
  showPrevious: isPreviousPageAvailable(state)
}), {
  loadUserListRequest,
  loadNextPage,
  loadPreviousPage
})(UsersPage);