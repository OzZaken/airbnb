import { Link } from 'react-router-dom'

export function StayPreview({ stay, onRemoveStay }) {
  return (
    <li className="stay-preview">
      <Link to={`/stay/${stay._id}`}>
        <img src={stay.imgUrls[0]} alt="image" />
        <div className="stay-info">
          <p className="stay-name">{`${stay.loc.city}, ${stay.loc.country}`}</p>
          <p className="stay-distance">1,109 kilometers</p>
          <p className="stay-date">Nov 30 - Dec 5</p>
        </div>
        <p className="stay-price">{`${stay.price}$ night`}</p>
      </Link>
      {/* <Link to={`/stay/edit/${stay._id}`}>Edit</Link> */}
    </li>
  )
}