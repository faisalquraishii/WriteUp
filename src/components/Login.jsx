import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => { //data is coming from the form inputs
        setError("") //empty out the errors at the outset.
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/") //routing the user to root
                /*If we use Link then a click is necessary whereas by the use of navigate we can programatically
                send the user to the desired route */
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    /> {/*When you spread the register function from React Hook Form into the Input 
                    component props, you're essentially passing down the registration 
                    process to the Input component. */}
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login

/*
'register' is used to connect form inputs to React Hook Form.
    -By spreading register into the input component props, you're essentially telling React Hook Form 
    to handle the input field's registration process. Also spreading helps to avoid the overwriting of input fields.
    -The registration process includes setting up validation rules, such as whether the field is required 
    or any custom validation functions, and connecting the input field to the form's internal state.

React Hook Form collects all the input field values and passes them to the submit handler 
function provided to handleSubmit.(i.e to login())
*/

/*Why use register?
The register method in the react-hook-form library is used to bind input fields in a form to the 
form state. --> binding input fields to the form state involves registering each input field with 
the library so that it can track changes to the field values and perform validation as needed.

Syntax--> The register method is typically used as a spread operator (...) on the input field component. 
<input {...register("fieldName", { validationRules })} />

"fieldName": This is a string representing the name of the field. It serves as a unique identifier 
for the input field within the form.
{ validationRules }: Optional validation rules object specifying validation criteria for the field.

register method automates the process by managing the state internally. This makes it easier to 
work with forms, especially in complex scenarios.*/