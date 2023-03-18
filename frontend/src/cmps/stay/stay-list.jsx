import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, onSetAvgRate, onToggleIsInWishlist, onClickPreviewImg,  loggedInUser }) {

    return <ul className='stay-list'>
        {stays.map(stay => {
            return <li key={stay._id}>

                <StayPreview stay={stay}
                    loggedInUser={loggedInUser}
                    onSetAvgRate={onSetAvgRate}
                    onRemoveStay={onRemoveStay}
                    onClickImg={onClickPreviewImg}
                    onToggleIsInWishlist={onToggleIsInWishlist}
                />
            </li>
        })}
    </ul>
}