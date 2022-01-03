import React from 'react'
import Avatar from '../../Avatar'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {GLOBALTYPES} from '../../../redux/actions/globalTypes'
import {deletePost, reportPost} from '../../../redux/actions/postAction'
import {BASE_URL} from '../../../utils/config'
import {AiOutlineDelete, AiTwotoneEdit, FiCopy, MdOutlineReportProblem} from "react-icons/all";

const CardHeader = ({post}) => {
    const {auth, socket} = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleEditPost = () => {
        dispatch({type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
    }

    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({post, auth, socket}))
            return history.push("/")
        }
    }

    const handleReportPost = () => {
        dispatch(reportPost({post, auth}));
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
                {
                    post && post.user ?
                        <>
                            <Avatar src={post && post.user ? post.user.avatar : ''} size="big-avatar"/>

                            <div className="card_name">
                                <h6 className="ml-3">
                                    <Link to={`/profile/${post.user._id}`} className="text-dark text-decoration-none">
                                        {post.user.username}
                                    </Link>
                                </h6>
                                <small className="text-muted ml-3">
                                    {moment(post.createdAt).fromNow()}
                                </small>
                            </div>
                        </> : ""
                }
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons"><AiTwotoneEdit className="mr-2"/></span> Edit Post
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost}>
                                <span className="material-icons"><AiOutlineDelete className="mr-2"/></span> Delete
                            </div>
                        </>
                    }

                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons"><FiCopy className="mr-2"/></span> Copy
                    </div>
                    <div className="dropdown-item" onClick={handleReportPost}>
                        <span className="material-icons text-yellow border-0"><MdOutlineReportProblem className="mr-2"/></span>
                        Report
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader
