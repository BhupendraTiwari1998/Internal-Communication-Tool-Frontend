import { notification } from 'antd'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {

  const navigate = useNavigate()

  const { edit_id } = useParams()
  const [edit, setEdit] = useState({})
  const getUserId = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios.get(`http://localhost:3004/get-singlepost/${edit_id}`)
      .then((res) => {
        console.log("aaa", res.data.data)
        setEdit(res.data.data)
        // console.log("single", edit)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [getUserId])

  const backHand = () => {
    navigate('/single-post')
  }

  return (
    <div className='bg-gray-400 min-h-screen w-[100%] pt-5'>
      <div style={{ marginLeft: '20px', paddingBottom: '20px' }}>
        <Button onClick={backHand}><IoArrowBackSharp /></Button>
      </div>
      <h2 style={{textAlign:'center'}}>Update your post !</h2> <br />
      <Formik
        initialValues={{ newPost: edit.newPost }}
        enableReinitialize={true}
        validate={values => {
          const errors = {};
          if (!values.newPost) {
            errors.newPost = 'Post Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios.put(`http://localhost:3004/update-post/${edit_id}`, values)
            .then((res) => {
              console.log(res.data)
              setSubmitting(false)
              notification.success({ message: res.data.message })
              navigate("/single-post")
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

          <div className='editpage'>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="newPost"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPost}
                className='border border-black'

              />
              {errors.newPost && touched.newPost && errors.newPost} <br />
              <button className='btn3' type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default EditPost