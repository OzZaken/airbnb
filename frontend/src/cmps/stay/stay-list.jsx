import { StayPreview } from './stay-preview'

export const StayList = ({ stays, loggedInUser, isLoading,
    onUpdateStay, onRemoveStay, onSetStayAvgRate,
    onAddToWishList, onRemoveFromWishList, onClickPreviewImg,
    onLoadMoreStays }) => {

    const stayPreview = {
        onSetStayAvgRate,
        onCLickImg: onClickPreviewImg,
        loggedInUser,
        isLoading,
        onAddToWishList,
        onRemoveFromWishList,
        onRemoveStay,
        onUpdateStay,
        onLoadMoreStays
    }

    return <ul className='stay-list'>
        {stays.map(stay => <li className='stay-list-item' key={`stay-preview-${stay._id}`}>
            <StayPreview stay={stay} {...stayPreview} />
        </li>)}
    </ul>
}