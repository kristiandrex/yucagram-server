export default function validateSignup(values) {
	const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	const errors = {};

	if (!values.username) {
		errors.username = 'Este campo es requerido';
	}

	else if (values.username.includes(' ')) {
		errors.username = 'No debe contener espacios';
	}

	if (!values.email) {
		errors.email = 'Este campo es requerido';
	}

	else if (!regex.test(values.email)) {
		errors.email = 'El correo no es válido';
	}

	if (!values.password) {
		errors.password = 'Este campo es requerido';
	}

	return errors;
}
