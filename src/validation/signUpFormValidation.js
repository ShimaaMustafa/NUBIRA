import { regex } from "./regex";
import { calculateAge } from "../helpers/date";

export function getFormValidation(watch) {
    return {
    name: {
        required: {value: true, message: 'Name is requied'},
        minLength: {value : 2 , message: 'Name must be at least two characters'} ,
        maxLength : {value: 50 , message: 'Name must be at most 50 characters'},
    },
    email: {
        required: {value : true , message: 'Email is required'},
        pattern: {value : regex.email , message: 'Email valid email'},
    },
    password: {
        required: {value : true , message: 'Password is required'},
        pattern: {value: regex.password , message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'}
    },
    rePassword: {
        required: {value : true , message: 'Confirm password is required'},
        validate: (rePassword) => rePassword == watch('password') || 'Password and confirm password must be the same'
    },
    dateOfBirth: {
        required: {value : true , message: 'Birth Date is required'},
        validate: (date) => {
            return calculateAge(date) >= 18 || 'Age must be more then or equal to 18 '
        }
    },
    gender: {
        required: {value : true , message: 'Gender is required'},
        validate: (gender) => gender == 'male' || gender == 'female' || 'Gender must be one of (Male - female)'
    },
    }
}