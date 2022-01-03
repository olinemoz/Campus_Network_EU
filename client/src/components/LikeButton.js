import React from 'react'
import {useSelector} from 'react-redux'

const LikeButton = ({isLike, handleLike, handleUnLike}) => {
    const {theme} = useSelector(state => state)

    return (
        <>
            {
                isLike
                    ? <i className="fas fa-heart text-danger mt-2" onClick={handleUnLike}
                         style={{filter: theme ? 'invert(1)' : 'invert(0)', fontSize: "28px", cursor: 'pointer'}}/>
                    : <i className="far fa-heart mt-2" onClick={handleLike} style={{fontSize: "28px", cursor: 'pointer'}}/>
            }
        </>
    )
}

export default LikeButton
