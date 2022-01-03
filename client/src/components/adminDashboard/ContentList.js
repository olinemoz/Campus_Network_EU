import React from 'react'
import Avatar from '../Avatar';
import {deleteSpamPost} from '../../redux/actions/adminAction'
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {AiFillDelete} from "react-icons/all";

const ContentList = ({content}) => {
    const {auth, socket} = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleDeletePost = (post) => {

        dispatch(deleteSpamPost({post, auth, socket}));

    };
    return (
        <div>
            {
                content.length > 0 ? (
                    content.map((post) => (
                        <div className="admin_content_display">
                              <span className="spam_report">
                                Reports: {post.reports.length}
                              </span>

                            <div className="d-flex">
                                <Avatar size="big-avatar" src={post.user.avatar}/>
                                <div className="d-flex flex-column ml-3">
                                    <span className="spam_username">{post.user.username}</span>
                                    <span className="spam_email">{post.user.email}</span>
                                </div>
                                <div className="text-muted mx-3 mt-3">
                                    <small>{moment(post.createdAt).fromNow()}</small>
                                </div>
                            </div>
                            <div
                                className="ms-auto d-flex flex-column"
                                style={{cursor: "pointer"}}
                                onClick={() => handleDeletePost(post)}
                            >
                                <AiFillDelete style={{fontSize: "28px", marginTop: "15px"}}/>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Nothing to display</h1>
                )}
        </div>
    );
}

export default ContentList
