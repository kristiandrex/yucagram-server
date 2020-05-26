import React, { Fragment, memo } from 'react';
import { User } from '../react-app-env';
import ItemListUsers from './ItemListUsers';

interface Props {
  users: User[];
}

 function ListUsers({ users }: Props) {
  return (
    <Fragment>
      {
        users.map(user => <ItemListUsers user={user} key={user._id} />)
      }
    </Fragment>
  );
}

export default memo(ListUsers);