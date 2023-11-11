import * as Yup from "yup"

export function initialValues(){

    return {
        email: "",
        password: "",
        username:"",
    };
}

export function validationSchema(){

    return Yup.object({
        email: Yup.string().email("email inválido").required("requerido"),
        password: Yup.string().min(2,'mínimo 2 caracteres').max(7,'máximo 7 caracteres').required('requerido'),
        username: Yup.string().matches(/^[aA-zZ\s]+$/, "Números no son permitidos").required("requerido"),

    })
}