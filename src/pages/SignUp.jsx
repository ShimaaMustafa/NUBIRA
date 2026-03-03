import { Button, Input, Select, SelectItem, Alert, addToast} from "@heroui/react";
import { EyeFilledIcon } from '../components/password/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../components/password/EyeSlashFilledIcon';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../validation/registerSchema';
import { Link, useNavigate } from 'react-router-dom';
import { apiServices } from '../services/apis';

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate()

    const {handleSubmit , register , formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        // defaultValues:{
        // name: "Ahmed Bahnasy",
        // email: "bahnasy204095101@gmail.com",
        // password: "Bahnasy123",
        // rePassword: "Bahnasy123",
        // dateOfBirth:"1994-7-10",
        // gender:"male"
        // }
    });
    
    async function signUp(registerData) {
        setIsLoading(true)
        setErrMsg('')
        try {
            await apiServices.signUp(registerData)
            console.log(data);
                addToast({
                title: "Success",
                description:"Account Created SuccessFully",
                color: "success",
            })
            navigate('/signin')
        } catch (error) {
            if (error.response) {
                setErrMsg(error.response.data.errors);
            } else {
                setErrMsg(error.message);
            }
        } finally {
            setIsLoading(false)
        }
        console.log(registerData);
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
        <form onSubmit={handleSubmit(signUp)}>
        <div className='grid gap-4'>
        <div className="grid gap-3 text-center">
            <h1 className='text-3xl font-bold'>Join Us Today</h1>
            <p>Create your account and start connecting</p>
        </div>

        <Input 
        {...register('name')} 
        {...getInputProps('Full Name' , 'text', errors.name)} />

        <Input 
        {...register('email')} 
        {...getInputProps('Email' , 'email', errors.email)} />

        <Input  
        {...register('password')} {...getInputProps('Password', `${isVisible ? 'text' : 'password'}`,errors.password)}
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
        } />

        <Input 
        {...register('rePassword')} {...getInputProps('Confirm Password', `${isVisible ? 'text' : 'password'}`,errors.rePassword)}/>
        
        <div className="grid gap-4 md:grid-cols-2">
        <Input {...register('dateOfBirth')} {...getInputProps('Birth date' , 'date',errors.dateOfBirth)} />

        <Select  {...register('gender')} {...getInputProps('Gender','' ,errors.gender)}>
        <SelectItem key='male'>Male</SelectItem>
        <SelectItem key='female'>Female</SelectItem>
        </Select>
        </div>
        

        <Button isLoading={isLoading} color='secondary' className='w-full' type='submit'>Sign Up</Button>
        <p>Already have an account? <Link to={'/signin'} className="text-purple-700 font-semibold">Login now</Link></p>
        {errMsg && <Alert hideIcon color='danger' title={errMsg} variant='faded' classNames={{base:'py-0 capitalize'}} />}
    </div>
    </form>
    )
}
