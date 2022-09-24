import AppIcon from '../../icon'
export const StayRate = ({ rate, reviewsCount, isReviewBtnShow }) => {
    return <div className="stay-rate">
        <div className="flex center">
            {rate}
            <AppIcon iconKey='star' />
            {isReviewBtnShow &&
                <button className="underline reviews">
                    {reviewsCount} reviews
                </button>
            }
        </div>
    </div>
}