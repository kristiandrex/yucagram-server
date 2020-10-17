import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMessagePill = styled.div`
  display: flex;
  padding-bottom: 8px;
  ${({ own }) => own && 'justify-content: flex-end;'}

  &:first-child{
    padding-top: 8px;
  }

  .message-pill {
    min-width: 80px;
    display: grid;
    grid-template-columns: 1fr auto;
    background: #fff;
  }

  .time {
    font-size: 0.70rem;
    display: inline-flex;
    align-items: flex-end;
  }

  .message-state {
    display: inline;

    .material-icons {
      font-size: .75rem;
      font-weight: bold;
    }
  }
`;

const MessagePill = forwardRef(({ children, message, own }, ref) => {
  const time = new Date(message.date);

  return (
    <StyledMessagePill
      className='message-row'
      own={own}
      ref={ref}
    >
      <div className='message-pill shadow-sm p-2 rounded'>
        {message.content}
        <div className="info">
          <div className='time ml-2 mr-1'>{time.getHours()}:{time.getMinutes()}</div>
          {children}
        </div>
      </div>
    </StyledMessagePill>
  );
})

MessagePill.propTypes = {
  message: PropTypes.object.isRequired,
  own: PropTypes.bool
};

export default MessagePill;