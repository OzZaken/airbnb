import { useState, useRef, useEffect } from 'react'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'
import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, setAvgRate, onToggleIsInWishlist, onClickPreviewImg, getRange }) {
    useEffect(() => {
        console.log('prices:', getRange('price'))
        console.log('capacities:', getRange('capacity'))
    }, [])
    var gPageIdx = 0
/* front paging page: 1,  */
    function nextPage() {
        gPageIdx++
        const isLastPage = (PAGE_SIZE + gPageIdx * PAGE_SIZE >= gBooks.length)
        return isLastPage
    
    }
    
    function prevPage() {
        gPageIdx--
        const isFirstPage = (PAGE_SIZE + gPageIdx * PAGE_SIZE >= gDefaultStays.length)
        return isFirstPage
    }
    return <section  className='stay-list'>
        {stays.map(stay => {
            return <StayPreview
                key={stay._id}
                stay={stay}
                onRemoveStay={onRemoveStay}
                onClickPreviewImg={onClickPreviewImg}
                onToggleIsInWishlist={onToggleIsInWishlist}
                setAvgRate={setAvgRate}
            />
        })}
    </section>
}

