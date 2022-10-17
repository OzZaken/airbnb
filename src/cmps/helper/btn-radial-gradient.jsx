export const BtnTrigger = () => {
    const btnColumns = []
    for (let i = 0; i < 100; i++) {
        btnColumns.push(<div key={i} className="cell"></div>)
    }
    return <div className="btn-container">
        {btnColumns}
        <div className="content">
            <button className="action-btn">
                <span>reserve</span>
            </button>
        </div>
    </div>
}