import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../PostCard'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'
import {Spinner} from "react-bootstrap";


const Posts = () => {
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

        dispatch({
            type: POST_TYPES.GET_POSTS, 
            payload: {...res.data, page: homePosts.page + 1}
        })

        setLoad(false)
    }

    return (
        <div className="posts">
            {
                homePosts.posts.map(post => (
                    <PostCard key={post._id} post={post} theme={theme} />
                ))
            }

            {
                load && <Spinner animation="border" variant="primary" className="d-block mx-auto"
                                 style={{height: "40px", width: "40px"}}/>
            }

            
            <LoadMoreBtn result={homePosts.result} page={homePosts.page}
            load={load} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Posts
