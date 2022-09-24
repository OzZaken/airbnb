import AppIcon from '../icon'
export const StayRate = ({ rate, reviewsCount, isReviewBtnShow }) => {
    return <div className="clean-list stay-rate">
        <div className="flex center">
            {rate}
            <AppIcon iconKey='star' />
            {isReviewBtnShow &&
                <button className="btn-link reviews">
                    {` ${reviewsCount} reviews `}
                </button>
            }
        </div>
    </div>
}