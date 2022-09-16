import { Link } from 'react-router-dom'

export function StayPreview({ stay, onRemoveStay }) {
  return (
    <div className="stay-preview">
      <Link to={`/stay/${stay._id}`} className="info">
      <img src={stay.imgUrls} alt="image"/>
      <div className="stay__info">
      <h4>{stay.name}</h4>
        <h4>{stay.type}</h4>
        <h6>{stay.price}</h6>
      </div>
      </Link>
        <Link to={`/stay/edit/${stay._id}`}>Edit</Link>
    </div>
  )
}



