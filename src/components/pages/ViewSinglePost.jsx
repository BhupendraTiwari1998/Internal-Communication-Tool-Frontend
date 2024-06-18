import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { notification } from 'antd'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackSharp } from "react-icons/io5";


const ViewSinglePost = () => {

    const [post, setPost] = useState([])
    const navigate = useNavigate();
    const [delete1, setDelete] = useState([])

    const singleId = JSON.parse(localStorage.getItem("user"))
    // console.log("single", singleId)

    useEffect(() => {
        axios.get(`http://localhost:3004/get-postofuser/${singleId}`)
            .then((res) => {
                // console.log(res.data)
                setPost(res.data.data)
                // console.log("post",post)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [singleId, delete1])

    const deleteHand = (id) => {
        axios.delete(`http://localhost:3004/delete-post/${id}`)
            .then((res) => {
                // console.log(res)
                setDelete(id)
                notification.success({ message: res.data.message })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editHand = (id) => {
        // console.log("id",id)
        navigate(`/edit-post/${id}`)
    }

    const backHand = () => {
        navigate('/addpost')
    }


    return (
        <div className='bg-stone-200 min-h-screen w-[100%] pt-10'>
            <div style={{ marginLeft: '20px', paddingBottom: '20px' }}>
                <Button onClick={backHand}><IoArrowBackSharp /></Button>
            </div>
            <Container>
                <Row>
                    {
                        post &&
                        post.map((elem, ind) => {
                            return (
                                <Col md={4}>
                                    <div key={ind} className='mypost pt-3'>
                                        <div><h2>{elem.newPost}</h2></div>
                                        <div><h4>Date: {moment(elem.createdAt).format("DD/MM/YYYY")}</h4></div>

                                        <button className='btn1' onClick={() => deleteHand(elem._id)}>Delete</button>
                                        <button className='btn1' onClick={() => editHand(elem._id)}>Edit</button>
                                    </div>
                                </Col>
                            )
                        })
                    }

                </Row>
            </Container>

        </div>
    )
}

export default ViewSinglePost