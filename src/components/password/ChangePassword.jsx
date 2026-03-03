import { Button, Input, addToast } from "@heroui/react";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../validation/changePasswordSchema";
import { apiServices } from "../../services/apis";
import { EyeFilledIcon } from "../../components/password/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/password/EyeSlashFilledIcon";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
    handleSubmit,
    register,
    formState: { errors },
    } = useForm({
    resolver: zodResolver(changePasswordSchema),
    });

    async function onSubmit(data) {
    setIsLoading(true);
    try {
    await apiServices.changePassword({
    password: data.oldPassword,
    newPassword: data.newPassword
});

    addToast({
        title: "Success",
        description: "Password changed successfully",
        color: "success",
    });

    setTimeout(() => {
        navigate("/signin");
    localStorage.removeItem("token"); 
    }, 1500);

    

    } catch (error) {
    addToast({
        title: "Error",
        description:
        error.response?.data?.message || "Something went wrong",
        color: "danger",
    });
    } finally {
    setIsLoading(false);
    }
    }

    function getInputProps(label, field) {
    return {
    variant: "flat",
    label,
    type: isVisible ? "text" : "password",
    isInvalid: !!field,
    errorMessage: field?.message,
    };
    }

return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto space-y-4">

    <h2 className="text-2xl font-bold text-center">
        Change Password
    </h2>

    <Input
        {...register("oldPassword")}
        {...getInputProps("Old Password", errors.oldPassword)}
    />

    <Input
        {...register("newPassword")}
        {...getInputProps("New Password", errors.newPassword)}
    />

    <Input
        {...register("confirmPassword")}
        {...getInputProps("Confirm Password", errors.confirmPassword)}
        endContent={
        <button
            type="button"
            onClick={toggleVisibility}
            className="focus:outline-none"
        >
            {isVisible ? (
            <EyeFilledIcon className="text-2xl text-default-400" />
            ) : (
            <EyeSlashFilledIcon className="text-2xl text-default-400" />
            )}
        </button>
        }
    />

    <Button
        type="submit"
        color="secondary"
        isLoading={isLoading}
        className="w-full"
    >
        Change Password
    </Button>

    </form>
    );
}