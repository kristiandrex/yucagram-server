interface Values {
    username?: string;
    password?: string;
}

export default function validateSignin(values: Values) {
    const errors: Values = {};

    if (!values.username) {
        errors.username = "Este campo es requerido";
    }

    if (!values.password) {
        errors.password = "Este campo es requerido";
    }

    return errors;
}