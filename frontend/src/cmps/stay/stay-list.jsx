import { useState, useRef, useEffect } from 'react'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'
import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, onSetAvgRate, onToggleIsInWishlist, onClickPreviewImg, getRange, loggedInUser }) {

return <section className='stay-list'>
        {stays.map(stay => {
            return <StayPreview stay={stay}
                key={stay._id}
                loggedInUser={loggedInUser}
                onSetAvgRate={onSetAvgRate}
                onRemoveStay={onRemoveStay}
                onClickPreviewImg={onClickPreviewImg}
                onToggleIsInWishlist={onToggleIsInWishlist}
            />
        })}
    </section>
}