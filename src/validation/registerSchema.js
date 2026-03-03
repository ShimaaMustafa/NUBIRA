import { calculateAge } from "../helpers/date";
import { regex } from "./regex";
import * as zod from'zod';


export const schema = zod.object({
    name: zod.string()
    .nonempty('Name is requied')
    .min(2, 'Name must be at least two characters')
    .max(50, 'Name must be at most 50 characters'),
    email: zod.string()
    .nonempty('Email is required')
    .regex(regex.email, 'Email valid email'),
    password: zod.string()
    .nonempty('Password is required')
    .regex(regex.password, 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'),
    rePassword: zod.string()
    .nonempty('Confirm password is required'),
    dateOfBirth: zod.string()
    .nonempty('Birth Date is required')
    .refine((date) => calculateAge(date) >= 18 , 'Age must be more then or equal to 18'),
    gender: zod.string()
    .nonempty('Gender is required')
    .regex(/^(male|female)$/, 'Gender must be one of (Male - female)')
    }).refine((data) => data.password == data.rePassword , { message: 'Password and confirm password must be the same', path: ['rePassword']})
    
    