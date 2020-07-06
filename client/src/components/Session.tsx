import React from 'react';
import LateralSection from './LateralSection';
import { State, User } from '../react-app-env';
import { useSelector } from 'react-redux';
import CurrentLayout from './CurrentLayout';
import styled from 'styled-components';
import ProfileChooser from './ProfileChooser';

const StyledSession = styled.div`
  .no-outline {
    outline: none;
  }

  .dropdown-toggle {
    &::after {
      display: none;
    }
  }

  .dropdown {
    .dropdown-toggle {
      outline: none;
      box-shadow: none;
      color: #212529;
    }
  }
`;

export default function Session() {
  const user = useSelector<State, User>((state) => state.user as User);

  if (user.new) {
    return (
      <ProfileChooser user={user} />
    )
  }

  return (
    <StyledSession className="row no-gutters h-100">
      <LateralSection />
      <CurrentLayout />
    </StyledSession>
  )
}