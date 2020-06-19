import React, { useState, FormEvent, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  handleSendMessage: (value: string) => void;
}

const StyledMessageBox = styled.div`
  height: 60px;

  form {
    height: 100%;
  }
`;

export default function MessageBox({ handleSendMessage }: Props) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleSendMessage(value);
    setValue('');
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <StyledMessageBox className="messages-box p-2 border-top">
      <form 
        className="d-flex align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Escribe un mensaje"
          value={value}
          onChange={handleChange}
        />
        <button className="btn btn-outline-primary ml-2">
          <i className="material-icons">send</i>
        </button>
      </form>
    </StyledMessageBox>
  );
}
