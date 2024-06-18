import { Formik } from 'formik';
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const SignUp = () => {

    const navigate = useNavigate()


    return (
        <div className='body1'>
            <Formik
                initialValues={{ name: '', email: '', contact: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Name Required';
                    }
                    if (!values.email) {
                        errors.email = 'Email Required';
                    }
                    if (!values.contact) {
                        errors.contact = 'Contact Required';
                    }
                    if (!values.password) {
                        errors.password = 'Password Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('http://localhost:3004/signup', values)
                        .then((res) => {
                            console.log("sign Up", res)
                            notification.success({ message: res.data.message })
                            setSubmitting(false)
                            navigate('/')
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
                    <div className='fappp mt-5'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder='Username'
                                className='border border-black pl-2'
                            />
                            {errors.name && touched.name && errors.name}
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
                                type="text"
                                name="contact"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contact}
                                placeholder='Enter your contact'
                                className='border border-black pl-2'
                            />
                            {errors.contact && touched.contact && errors.contact}
                            <input
                                type="text"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Enter your password'
                                className='border border-black pl-2'
                            />
                            {errors.password && touched.password && errors.password}
                            <div className='mt-4'><button type="submit" disabled={isSubmitting}>Submit</button></div>
                            
                        </form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default SignUp