import React from 'react'
import {Spinner} from "react-bootstrap";


const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
             style={{background: "#0008", color: "white", top: 0, left: 0, zIndex: 50}}
        >
            <Spinner animation="border" variant="primary" style={{height: "50px", width: "50px"}}/>
        </div>
    )
}

export default Loading

