import React from 'react';
import LateralSection from './LateralSection';
import { State, Current } from '../react-app-env';
import { useSelector } from 'react-redux';
import CurrentLayout from './CurrentLayout';
import styled from 'styled-components';

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
  const current = useSelector<State, Current>((state) => state.current);

  return (
    <StyledSession className="row no-gutters h-100">
      <LateralSection />
      {current.user !== null || current.chat !== null ? <CurrentLayout /> : null}
    </StyledSession>
  )
}