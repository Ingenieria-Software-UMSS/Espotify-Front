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
        email: Yup.string().required("email ivalido"),
        password: Yup.string().required("contraseña ivalido"),
        username: Yup.string().required("nombre ivalido"),

    })
}