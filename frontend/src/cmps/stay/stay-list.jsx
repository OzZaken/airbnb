import { StayPreview } from './stay-preview'

export const StayList = ({
    stays,  isLoading, loggedInUser, /* State */
    onUpdateStay, onRemoveStay, onSetStayAvgRate,/* CRUD */
    onAddToWishlist, onRemoveFromWishlist,  /* Wishlist */
    onClickPreviewImg, onLoadMoreStays   /* NAV */
}) => {

    const stayPreview = {
        isLoading,
        loggedInUser,
        onSetStayAvgRate,
        onCLickImg: onClickPreviewImg,
        onAddToWishlist,
        onRemoveFromWishlist,
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