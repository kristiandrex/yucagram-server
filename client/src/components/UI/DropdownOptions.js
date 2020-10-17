import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types'

export default function DropdownOptions({ children, onClick }) {

  const handleClick = (event) => {
    event.stopPropagation();

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <Dropdown onClick={handleClick}>
      <Dropdown.Toggle variant='ligth'>
        <span className='material-icons'>more_vert</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
}

DropdownOptions.propTypes = {
  onClick: PropTypes.func
}