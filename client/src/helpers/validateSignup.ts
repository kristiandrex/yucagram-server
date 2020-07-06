interface Values {
    username?: string;
    email?: string;
    password?: string;
}

export default function validateSignup(values: Values) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const errors: Values = {};

    if (!values.username) {
        errors.username = "Este campo es requerido";
    }

    else if (values.username.includes(' ')) {
        errors.username = "No debe contener espacios";
    }

    if (!values.email) {
        errors.email = "Este campo es requerido";
    }

    else if (!regex.test(values.email)) {
        errors.email = "El correo no es válido";
    }

    if (!values.password) {
        errors.password = "Este campo es requerido";
    }

    else if (values.password.length < 8) {
        errors.password = "Debe tener al menos 8 caracteres";
    }

    return errors;
}