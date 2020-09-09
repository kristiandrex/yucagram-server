import React from 'react';
import PropTypes from 'prop-types'

export default function Badge({ count, show }) {
	if (!show)
		return null

	return (
		<span className='badge badge-primary'>{count}</span>
	)
}

Badge.propTypes = {
	count: PropTypes.number.isRequired,
	show: PropTypes.bool.isRequired
}