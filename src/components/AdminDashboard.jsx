import { notification, Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const AdminDashboard = () => {

    const [admin, setAdmin] = useState([])
    const [delete2, setDelete2] = useState()
    const [approvedPosts, setApprovedPosts] = useState(() => {
        // Retrieve approved posts from local storage
        const savedApprovedPosts = localStorage.getItem('approvedPosts')
        return savedApprovedPosts ? JSON.parse(savedApprovedPosts) : []
    })
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3004/getPost')
            .then((res) => {
                console.log(res.data)
                setAdmin(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [delete2])

    const ondeleteHand = (id) => {
        axios.delete(`http://localhost:3004/delete-post/${id}`)
            .then((res) => {
                console.log(res.data)
                notification.success({ message: res.data.message })
                setDelete2(id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const logOutHand = () => {
        localStorage.clear()
        navigate('/')
    }

    const approveHand = (id) => {
        notification.success({ message: "Approved" })
        const updatedApprovedPosts = [...approvedPosts, id]
        setApprovedPosts(updatedApprovedPosts)
        // Save the updated approved posts to local storage
        localStorage.setItem('approvedPosts', JSON.stringify(updatedApprovedPosts))
    }

    const showDeleteConfirm = (id) => {
        setPostIdToDelete(id)
        setIsModalVisible(true)
    }

    const handleOk = () => {
        ondeleteHand(postIdToDelete)
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
        setPostIdToDelete(null)
    }

    return (
        <div className='bg-slate-300 min-h-screen w-[100%] '>
            <div className='flex justify-end pt-4 mr-4'>
                <button className='btn6' onClick={logOutHand}>Log Out</button>
            </div>

            <h2 className='text-center mb-5'>Admin Dashboard</h2>

            <Container>
                <Row>
                    {
                        admin &&
                        admin.map((elem, ind) => {
                            return (
                                <Col md={12} key={elem._id}>
                                    <div className='admin1'>
                                        <h3>{elem.newPost}</h3>
                                        <h5>Date : {moment(elem.createdAt).format("DD/MM/YYYY")}</h5>
                                        {/* <h5>{elem.name}</h5> */}

                                        <button className='btn4' onClick={() => showDeleteConfirm(elem._id)}>Delete</button>
                                        <button 
                                            className='btn5' 
                                            onClick={() => approveHand(elem._id)}
                                            disabled={approvedPosts.includes(elem._id)}
                                        >
                                            {approvedPosts.includes(elem._id) ? "Approved" : "Approve"}
                                        </button>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>

            {/* internal communication tool */}
            <Modal
                title="Confirm Deletion"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to delete this post?</p>
            </Modal>
        </div>
    )
}

export default AdminDashboard





// import {notification } from 'antd'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Col, Container, Row } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import moment from 'moment'

// const AdminDashboard = () => {

//     const [admin, setAdmin] = useState([])
//     const [delete2, setDelete2] = useState()

//     const navigate = useNavigate()

//     useEffect(() => {
//         axios.get('http://localhost:3004/getPost')
//             .then((res) => {
//                 console.log(res.data)
//                 setAdmin(res.data.data)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }, [delete2])

//     const ondeleteHand = (id) => {
//         axios.delete(`http://localhost:3004/delete-post/${id}`)
//             .then((res) => {
//                 console.log(res.data)
//                 notification.success({ message: res.data.message })
//                 setDelete2(id)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     const logOutHand = () => {
//         localStorage.clear()
//         navigate('/')
//     }

//     const approvehand=()=>{
//         notification.success({message:"Approved"})
//     }
//     return (
//         <div className='bg-slate-300 min-h-screen w-[100%] '>
//             <div className='flex justify-end pt-4 mr-4'>
//                 <button className='btn6' onClick={logOutHand}>Log Out</button>
//             </div>

//             <h2 className='text-center mb-5'>Admin Dashboard</h2>

//             <Container>
//                 <Row>
//                     {
//                         admin &&
//                         admin.map((elem, ind) => {
//                             return (
//                                 <Col md={12}>
//                                     <div className='admin1'>
//                                         <h3>{elem.newPost}</h3>
//                                         <h5>Date : {moment(elem.createdAt).format("DD/MM/YYYY")}</h5>
//                                         {/* <h5>{elem.name}</h5> */}

//                                         <button className='btn4' onClick={() => ondeleteHand(elem._id)}>Delete</button>
//                                         <button className='btn5' onClick={approvehand}>Approve</button>
//                                     </div>
//                                 </Col>
//                             )
//                         })
//                     }
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default AdminDashboard