import { useState } from 'react';
import { UseTokenType } from '../react-app-env';

export default function useToken(): UseTokenType {
  const [state, setState] = useState<string | null>(window.localStorage.getItem('token'));

  const setValue = (value: string) => {
    try {
      setState(value);
      window.localStorage.setItem('token', value);
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    setState(null);
    window.localStorage.removeItem('token');
  };

  return [state, setValue, removeValue];
}
