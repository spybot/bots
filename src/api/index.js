// @flow
//import request from 'axios';
import type {User} from 'types';
import {keyBy, values} from 'lodash';

type ResultType<T> = {
  result: T
}

type GetUsersResultType = {
  ...ResultType<Array<User>>,
  nextPageUrl?: string,
  previousPageUrl?: string
}

const mockUsers= keyBy([
  {
    id: '1',
    name: 'Test',
    avatarUrl: 'https://www.funnypica.com/wp-content/uploads/2012/01/Funny-Cats-Funny-Cat-Picture-079-FunnyPica.com_.jpg'
  }
], 'id');

export function getUsers(url?: string): Promise<GetUsersResultType> {
  return new Promise(resolve => {
    resolve({
      result: values(mockUsers)
    })
  });
  //return request.get(url ? url : '/api/users');
}

export function getUser(id: string): Promise<ResultType<User>> {
  return new Promise(resolve => {
    resolve({
      result: mockUsers[id]
    })
  });
  //return request.get(`/api/users/${id}`);
}

export function updateUser(id: string, userInfo: User): Promise<ResultType<User>> {
  return new Promise(resolve => {
    const user = mockUsers[id];
    const updatedUserInfo = {
      ...user,
      ...userInfo,
      id,
    };

    mockUsers[id] = updatedUserInfo;

    resolve({
      result: updatedUserInfo
    })
  });
  //return request.post(`/api/users/${id}`, userInfo);
}