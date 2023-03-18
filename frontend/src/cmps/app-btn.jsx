export const BtnApp = ({txt}) => {
    const btnColumns = []
   
    for (let i = 0; i < 100; i++) {
      btnColumns.push(<div key={i} className="cell"></div>)
    }

    return <div className="btn-app">

      {btnColumns}

      <div className="content">

        <button className="action-btn">
          <span>{txt}</span>
        </button>
        
      </div>
    </div>
  }