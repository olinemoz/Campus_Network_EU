import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'
import {getSuggestions} from '../../redux/actions/suggestionsAction'

const RightSideBar = () => {
    const {auth, suggestions} = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="mt-3 shadow-lg p-3 rounded">
            <UserCard user={auth.user}/>

            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-success">People You May Know</h5>
                {
                    !suggestions.loading &&
                    <i className="fas fa-redo" style={{cursor: 'pointer'}}
                       onClick={() => dispatch(getSuggestions(auth.token))}/>
                }
            </div>

            {
                suggestions.loading
                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/>
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
