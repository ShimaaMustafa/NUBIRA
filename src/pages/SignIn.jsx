import {Button, Input, Alert} from "@heroui/react";
import { useContext, useState } from 'react';
import {useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../validation/loginSchema';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from "../contexts/authContext";
import { apiServices } from "../services/apis";

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate()
    const {setUserToken} = useContext(authContext)

    const {handleSubmit , register , formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        // defaultValues:{
        // email: "bahnasy204095101@gmail.com",
        // password: "Bahnasy@123",
        // }
    });
    
    async function signIn(loginData) {
        setIsLoading(true)
        setErrMsg('')
        try {
            const data = await apiServices.signIn(loginData)
            console.log(data);
            localStorage.token = data.data.token;
            setUserToken(data.data.token)
            // navigate('/')
        } catch (error) {
            if (error.response) {
                setErrMsg(error.response.data.errors);
            } else {
                setErrMsg(error.message);
            }
        } finally {
            setIsLoading(false)
        }
    }

    function getInputProps(label, type, field){
        return {
            variant: 'flat',
            label,
            type,
            isInvalid: !!field,
            errorMessage: field?.message
        }
    }
    
    
    // password

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    
    return (
        <form onSubmit={handleSubmit(signIn)}>
        <div className='grid gap-4'>
        <div className="grid gap-3 text-center">
            <h1 className='text-3xl font-bold'>Welcome Back</h1>
            <p>Sign in to continue your journey</p>
        </div>

        
        <Input 
        {...register('email')} 
        {...getInputProps('Email' , 'email', errors.email)} />

        {/* <Input  
        {...register('password')} {...getInputProps('Password', "{isVisible ? 'text' : 'password'}",errors.password)}
        endContent={
        <button
        aria-label="toggle password visibility"
        className="focus:outline-solid outline-transparent"
        type="button"
        onClick={toggleVisibility}
        >
        {isVisible ? (
        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
        ) : (
        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
        )}
        </button>
        } /> */}

        <Input {...register('password')} {...getInputProps('Password','password',errors.password)}/>

        <Button isLoading={isLoading} color='secondary' className='w-full' type='submit'>Sign In</Button>
        <p>U don’t have an account? <Link to={'/signup'} className="text-purple-700 font-semibold">Creat one now</Link></p>
        {errMsg && <Alert hideIcon color='danger' title={errMsg} variant='faded' classNames={{base:'py-0 capitalize'}} />}
    </div>
    </form>
    )
}