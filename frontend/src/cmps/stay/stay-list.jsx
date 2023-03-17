import { useState, useRef, useEffect } from 'react'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'
import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, setAvgRate, onToggleIsInWishlist, onClickPreviewImg, getRange, loggedInUser }) {
    useEffect(() => {
        console.log('prices:', getRange('price'))
        console.log('capacities:', getRange('capacity'))
    }, [])
    const [pageIdx, setPageIdx] = useState(0)
    // const pageIdxRef = useRef(0)

    /* front paging page: 1,  */

    return <section className='stay-list'>
        {stays.map(stay => {
            return <StayPreview stay={stay}
                key={stay._id}
                loggedInUser={loggedInUser}
                setAvgRate={setAvgRate}
                onRemoveStay={onRemoveStay}
                onClickPreviewImg={onClickPreviewImg}
                onToggleIsInWishlist={onToggleIsInWishlist}
            />
        })}
    </section>
}