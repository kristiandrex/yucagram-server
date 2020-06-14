import React, { Fragment } from 'react';
import { User } from '../react-app-env';
import ItemListUsers from './ItemListUsers';

interface Props {
  users: User[];
}

export default function ListUsers({ users }: Props) {
  return (
    <Fragment>
      {
        users.map(user => <ItemListUsers user={user} key={user._id} />)
      }
    </Fragment>
  );
}