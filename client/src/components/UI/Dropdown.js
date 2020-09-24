import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CustomDropdown({ id, icon, onClick, children, white }) {
  const className = `material-icons ${white && 'text-white'}`;

  return (
    <DropdownButton
      id={id}
      title={<span className={className}>{icon}</span>}
      onClick={(event) => event?.stopPropagation()}
      variant='link'
    >
      <Dropdown.Item onClick={onClick} className='text-center'>
        {children}
      </Dropdown.Item>
    </DropdownButton>
  );
}

CustomDropdown.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string || PropTypes.element,
  white: PropTypes.bool
};