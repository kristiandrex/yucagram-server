import React from 'react'
import PropTypes from 'prop-types'

export default function MessageState({ seen }) {
  return (
    <div className='message-state'>
      <span className='material-icons'>
        {seen ? 'done_all' : 'done'}
      </span>
    </div>
  )
}

MessageState.propTypes = {
  seen: PropTypes.bool.isRequired
}