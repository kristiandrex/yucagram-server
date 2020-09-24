import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMessagePill = styled.div`
.message-pill {
	min-width: 80px;
	display: grid;
	grid-template-columns: 1fr auto;

	.date {
		font-size: 0.70rem;
		display: flex;
		align-items: flex-end;
	}
}
`;

function MessagePill({ message, own }) {
  const date = new Date(message.date);

  return (
    <StyledMessagePill className={own ? 'message-row d-flex justify-content-end' : 'message-row d-flex'}>
      <div className='message-pill shadow-sm p-2 rounded bg-white'>
        {message.content}
        <div className='date ml-2'>{date.getHours()}:{date.getMinutes()}</div>
      </div>
    </StyledMessagePill>
  );
}

MessagePill.propTypes = {
  message: PropTypes.object.isRequired,
  own: PropTypes.bool.isRequired
};

export default memo(MessagePill);
