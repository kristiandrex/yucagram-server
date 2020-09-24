import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Lateral from './Lateral/Lateral';
import CurrentLayout from './Current/CurrentLayout';
import InitialAvatar from './Profile/InitialAvatar';

const StyledSession = styled.div`
  .no-outline {
    outline: none;
  }

  .dropdown-toggle {
    outline: none;
    box-shadow: none;
    color: #212529;

    &::after {
      display: none;
    }
  }
`;

export default function Screen() {
  const isNew = useSelector((state) => state.auth.user.new);

  if (isNew) {
    return <InitialAvatar />;
  }

  return (
    <StyledSession className='row no-gutters h-100'>
      <Lateral />
      <CurrentLayout />
    </StyledSession>
  );
}