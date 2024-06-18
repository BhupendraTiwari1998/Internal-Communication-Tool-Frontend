import React from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from "antd"

const SignIn = () => {

    const navigate = useNavigate()
    return (
        <div className='body1'>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('http://localhost:3004/signin', values)
                        .then((res) => {
                            console.log("signIn", res)
                            setSubmitting(false);
                            const { token, role } = res.data.data
                            localStorage.setItem("user", JSON.stringify(res.data.data._id))
                            localStorage.setItem("token", token)
                            localStorage.setItem("role", role);
                            sessionStorage.setItem("login", 'true')

                            if (role === 1) {
                                navigate('/dashboard')
                                notification.success({ message: res.data.message })
                            }
                            else {
                                navigate("/addpost")
                                notification.success({ message: res.data.message })
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <div className='fappp'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Enter your email'
                                className='border border-black pl-2'
                            />
                            {errors.email && touched.email && errors.email}
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Enter your password'
                                className='border border-black pl-2'
                            />
                            {errors.password && touched.password && errors.password}

                            <div className='my-8'>
                                <button type="submit" disabled={isSubmitting}> Sign In</button>
                            </div>
                            <Link to={"/signUp"}>Don't have an account? Sign Up</Link>
                        </form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default SignIn