import React, { useState, FormEvent } from 'react';

interface Props {
  handleSendMessage: (value: string) => void;
}


export default function MessageBox({ handleSendMessage }: Props) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleSendMessage(value);
    setValue('');
  };

  return (
    <form className="d-flex align-items-center p-2 border-top shadow-sm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Escribe un mensaje"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="btn btn-link">
        <i className="material-icons">send</i>
      </button>
    </form>
  );
}
