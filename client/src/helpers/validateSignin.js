export default function validateSignin(values) {
	const errors = {};

	if (!values.username) {
		errors.username = 'Este campo es requerido';
	}

	if (!values.password) {
		errors.password = 'Este campo es requerido';
	}

	return errors;
}
