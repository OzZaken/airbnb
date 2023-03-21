import { StayPreview } from './stay-preview'

export const StayList = ({ stays, loggedInUser, isLoading,
    onUpdateStay, onRemoveStay, onSetAvgRate,
    onAddToWishList, onRemoveFromWishList, onClickPreviewImg
}) => {

    const props = {
        loggedInUser,
        isLoading,
        onAddToWishList,
        onRemoveFromWishList,
        onRemoveStay,
        onSetAvgRate,
        onUpdateStay,
        onCLickImg: onClickPreviewImg,
    }

    return <ul className='stay-list'>
        {stays.map(stay => <li className='stay-list-item' key={`stay-preview-${stay._id}`}>
            <StayPreview stay={stay} {...props} />
        </li>)}
    </ul>
}