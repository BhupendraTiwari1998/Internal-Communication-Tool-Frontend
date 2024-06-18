import { Button, notification } from 'antd';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddNewPost = () => {

    const navigate = useNavigate()

    const viewMyPost = () => {
        navigate('/single-post')
    }

    const viewOtherPost = () => {
        navigate('/all-post')
    }

    const getUserId = JSON.parse(localStorage.getItem('user'))
    // console.log(getUserId);

    const logOutHand = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className='body1'>

            <div className='flex justify-end mr-5'> <Button className='bg-sky-400' onClick={logOutHand}>Log Out</Button></div>

            <div className='text-center pb-3'>
                <h2>User can create new post !</h2>
            </div>

            <Formik
                initialValues={{ newPost: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.newPost) {
                        errors.newPost = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const addUser = {
                        newPost: values.newPost,
                        userID: getUserId,
                    }
                    axios.post('http://localhost:3004/add-post', addUser)
                        .then((res) => {
                            console.log(res.data.data)
                            setSubmitting(false)
                            notification.success({ message: res.data.message })
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
                    <div className='fapp'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="newPost"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPost}
                                placeholder='Enter Your Post...'
                                className='border border-black pl-2'
                            />
                            {errors.newPost && touched.newPost && errors.newPost}

                            <div><button type="submit" disabled={isSubmitting}>Create Post</button></div>

                            <div><button type="button" onClick={viewMyPost}>View My Post</button></div>

                            <div><button type="button" onClick={viewOtherPost}>View Other User Post</button></div>

                        </form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default AddNewPost