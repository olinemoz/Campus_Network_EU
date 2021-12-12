import React, { useState, useEffect } from 'react'
import PostThumb from '../PostThumb'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {Spinner} from "react-bootstrap";

const Saved = ({auth, dispatch}) => {
    const [savePosts, setSavePosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(2)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        getDataAPI('getSavePosts', auth.token)
        .then(res => {
            setSavePosts(res.data.savePosts)
            setResult(res.data.result)
            setLoad(false)
        })
        .catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })

        return () => setSavePosts([])
    },[auth.token, dispatch])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token)
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false)
    }

    return (
        <div>
            <PostThumb posts={savePosts} result={result} />

            {
                load && <Spinner animation="border" variant="primary" className="d-block mx-auto"
                                 style={{height: "40px", width: "40px"}}/>
            }

            
            <LoadMoreBtn result={result} page={page}
            load={load} handleLoadMore={handleLoadMore} />
            
        </div>
    )
}

export default Saved
