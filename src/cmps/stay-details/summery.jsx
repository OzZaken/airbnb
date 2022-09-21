export const StaySummary = ({ summary }) => {
    if (!summary) return
    console.log('summary:', summary)
    let isShowMoreBtn = summary.length > 0 ? true : false
    return <section className="stay-summary">
        {summary}
        {isShowMoreBtn &&
            <div>
                <button className="capitalize underline">
                    <b>Show More</b>
                </button>
            </div>
        }
    </section>
}