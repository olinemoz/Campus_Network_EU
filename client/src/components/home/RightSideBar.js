import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import {getSuggestions} from '../../redux/actions/suggestionsAction'
import {Spinner} from "react-bootstrap";

const RightSideBar = () => {
    const {auth, suggestions} = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="mt-3 shadow-lg py-3 px-1 rounded">
            <UserCard user={auth.user}/>

            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-success ml-4">People You May Know</h5>
                {
                    !suggestions.loading &&
                    <i className="fas fa-redo mr-3" style={{cursor: 'pointer'}}
                       onClick={() => dispatch(getSuggestions(auth.token))}/>
                }
            </div>

            {
                suggestions.loading
                    ? <Spinner animation="border" variant="primary" className="d-block mx-auto"
                               style={{height: "40px", width: "40px"}}/>
                    : <div className="suggestions">
                        {
                            suggestions.users.map(user => (
                                user.role === 'admin' || <UserCard key={user._id} user={user}>
                                    <FollowBtn user={user}/>
                                </UserCard>
                            ))
                        }
                    </div>
            }

        </div>
    )
}

export default RightSideBar
