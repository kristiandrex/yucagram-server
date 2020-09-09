import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function Input({ invalid, label, error, ...rest }) {
	return (
		<Fragment>
			<input
				className={invalid ? 'form-control is-invalid' : 'form-control'}
				{...rest}
			/>
			<small className={invalid ? 'invalid-feedback' : 'text-muted form-text mt-2'}>
				{invalid ? error : label}
			</small>
		</Fragment>
	)
}

Input.propTypes = {
	invalid: PropTypes.bool,
	label: PropTypes.string,
	error: PropTypes.string
}