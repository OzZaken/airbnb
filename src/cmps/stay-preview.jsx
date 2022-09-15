import { Link } from 'react-router-dom'

export function StayPreview({ stay, onRemoveStay }) {
  return (
    <div className="stay-preview">
      <Link to={`/stay/${stay._id}`} className="info">
        <h2>{stay.name}</h2>
        <h4>{stay.price}</h4>
      </Link>
        <Link to={`/stay/edit/${stay._id}`}>Edit</Link>
    </div>
  )
}