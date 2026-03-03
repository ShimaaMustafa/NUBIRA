import * as zod from "zod";
import { regex } from "./regex";

export const changePasswordSchema = zod.object({
    oldPassword: zod
    .string()
    .nonempty("Old password is required"),

    newPassword: zod
    .string()
    .nonempty("New password is required")
    .regex(
    regex.password,
    "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    ),

    confirmPassword: zod
    .string()
    .nonempty("Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
});