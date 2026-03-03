import { regex } from "./regex";
import * as zod from'zod';


export const schema = zod.object({
    email: zod.string()
    .nonempty('Email is required')
    .regex(regex.email, 'Email valid email'),
    password: zod.string()
    .nonempty('Password is required')
    .regex(regex.password, 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'),
    })
    