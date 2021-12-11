import React, {useEffect, useState} from "react";
import "../main/Main.css";
import {useSelector} from "react-redux";
import axios from "axios";
import {Button, Col, Row} from "react-bootstrap";

const UsersManagement = () => {
    const {auth} = useSelector((state) => state);
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/users`)
            .then(response => setUsers(response.data.filter(user => user.role !== 'admin')))
    }, [])

    const handleDeleteOrder = id => {
        const proceed = window.confirm("Are you sure you want to delete this User ?")
        if (proceed) {
            axios.delete(`http://localhost:5000/users/${id}`)
                .then(response => {
                    if (response.data.deletedCount > 0) {
                        const restUsers = users.filter(order => order._id !== id)
                        setUsers(restUsers)
                        alert("User has been deleted!")
                    }
                })
        }
    }

    return (
        <div className="main_admin shadow-lg rounded mb-5">
            <div className="main__container">
                <div className="main__title">
                    <div className="main__greeting">
                        <h1>Hello {auth.user.username}</h1>
                        <p>Welcome to your Admin Dashboard</p>
                    </div>

                </div>
            </div>
            <Row className="mx-5 bg-primary text-light py-2 rounded">
                <Col sm={11}>
                    <Row  className="px-5">
                        <Col xs={6}>
                            <span>#name</span>
                        </Col>
                        <Col xs={6}>
                            <span>#username</span>
                        </Col>
                    </Row>
                </Col>
                <Col sm={1}>
                    <span/>
                </Col>
            </Row>

            {
                users.map(user => (
                    <div key={user._id}>
                        <ul className="list-group mx-5 my-2 bg-light shadow-sm">
                            <li className="px-5 py-2">
                                <Row>
                                    <Col sm={11}>
                                        <Row>
                                            <Col xs={6}>
                                                <span>{user.fullname}</span>
                                            </Col>
                                            <Col xs={6}>
                                                <span>{user.username}</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={1}>
                                        <Button onClick={() => handleDeleteOrder(user._id)} variant="primary"
                                                size="sm">Delete</Button>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};

export default UsersManagement;
