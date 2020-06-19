import React from 'react';
import LateralSection from './LateralSection';
import { State, Current } from '../react-app-env';
import { useSelector } from 'react-redux';
import CurrentLayout from './CurrentLayout';

export default function Session() {
  const current = useSelector<State, Current>((state) => state.current);

  return (
    <div className="row no-gutters h-100">
      <LateralSection />
      {current.user !== null || current.chat !== null ? <CurrentLayout/> : null }
    </div>
  )
}