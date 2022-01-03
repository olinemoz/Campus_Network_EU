import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import LikeButton from '../../LikeButton'
import {useSelector, useDispatch} from 'react-redux'
import {likePost, unLikePost, savePost, unSavePost} from '../../../redux/actions/postAction'
import ShareModal from '../../ShareModal'
import {BASE_URL} from '../../../utils/config'
import {MdOutlineModeComment, RiShareCircleFill} from "react-icons/all";


const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [isShare, setIsShare] = useState(false)

    const {auth, theme, socket} = useSelector(state => state)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // Likes
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    }, [post.likes, auth.user._id])

    const handleLike = async () => {
        if (loadLike) return;

        setLoadLike(true)
        await dispatch(likePost({post, auth, socket}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if (loadLike) return;

        setLoadLike(true)
        await dispatch(unLikePost({post, auth, socket}))
        setLoadLike(false)
    }


    // Saved
    useEffect(() => {
        if (auth.user.saved.find(id => id === post._id)) {
            setSaved(true)
        } else {
            setSaved(false)
        }
    }, [auth.user.saved, post._id])

    const handleSavePost = async () => {
        if (saveLoad) return;

        setSaveLoad(true)
        await dispatch(savePost({post, auth}))
        setSaveLoad(false)
    }

    const handleUnSavePost = async () => {
        if (saveLoad) return;

        setSaveLoad(true)
        await dispatch(unSavePost({post, auth}))
        setSaveLoad(false)
    }

    return (
        <div className="card_footer">
            <div className="">
                <div className="d-flex ml-3">
                    <div>
                        <LikeButton
                            isLike={isLike}
                            handleLike={handleLike}
                            handleUnLike={handleUnLike}
                        />
                    </div>

                    <div>
                        <Link to={`/post/${post._id}`} className="text-dark">
                            <MdOutlineModeComment className="ml-3 mt-2" style={{fontSize: "28px"}}/>
                        </Link>
                    </div>
                    <div>
                        <RiShareCircleFill onClick={() => setIsShare(!isShare)} className="ml-3 mt-2"
                                           style={{fontSize: "28px", cursor: 'pointer'}}/>
                    </div>

                    <div>
                        {
                            saved
                                ? <i className="fas fa-bookmark text-info ml-3 mt-2"
                                     onClick={handleUnSavePost} style={{fontSize: "28px"}}/>

                                : <i className="far fa-bookmark ml-3 mt-2"
                                     onClick={handleSavePost} style={{fontSize: "28px"}}/>
                        }
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.likes.length} likes
                </h6>

                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.comments.length} comments
                </h6>
            </div>

            {
                isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme}/>
            }
        </div>
    )
}

export default CardFooter
