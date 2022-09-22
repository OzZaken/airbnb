export const StaySummary = ({ summary }) => {
    if (!summary) return
    let isShowMoreBtn = summary.length > 0 ? true : false
    return <div className="stay-details-row stay-summary">
        {summary}
        {isShowMoreBtn &&
            <div>
                <button className="capitalize underline">
                    <b>Show More</b>
                </button>
            </div>
        }
    </div>
}