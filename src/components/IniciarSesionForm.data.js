
import * as Yup from "yup";

export function initialValues(){
    return {
        email:"",
        password:"",
    };
}

export function validationSchema(){

    return Yup.object({
        email: Yup.string().email("Correo electrónico inválido").required(true),
        password: Yup.string().min(2,'Contraseña incorrecta, mínimo 2 caracteres').max(8,'Contraseña incorrecta, máximo 8 caracteres').required(true),
    })
}
