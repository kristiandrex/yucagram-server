import { useState } from 'react';

type Tuple = [string | null, (value: string) => void, () => void];

export default function useToken(): Tuple {
  const [storedValue, setStoredValue] = useState<string | null>(window.localStorage.getItem('token'));

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem('token', value);
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    setStoredValue(null);
    window.localStorage.removeItem('token');
  };

  return [storedValue, setValue, removeValue];
}
