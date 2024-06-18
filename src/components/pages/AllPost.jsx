import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const AllPost = () => {

  const [allPost, setAllPost] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3004/getPost')
      .then((res) => {
        console.log(res.data)
        setAllPost(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const backHand = () => {
    navigate('/addpost')
  }

  // const getUser = localStorage.getItem("user")
  return (
    <div className='min-h-screen bg-slate-400'>

      <div style={{ marginLeft: '20px', padding: '20px 0' }}>
        <Button onClick={backHand}><IoArrowBackSharp /></Button>
      </div>
      <Container>
        <Row>
          {
            allPost &&
            allPost.map((elem, ind) => {
              return (
                <Col md={12}>
                  <div className='AllPost'>
                    <h2>{elem.newPost}</h2>
                    <h4>Date : {moment(elem.createdAt).format("DD/MM/YYYY")}</h4>
                    {/* <h5>{elem?.name}</h5> */}
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

export default AllPost