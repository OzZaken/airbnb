import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import Carousel from 'react-material-ui-carousel'


export function StayPreview({ stay, onRemoveStay }) {
  return (
    <li className="stay-preview">
      <Link to={`/stay/${stay._id}`}>

        {/* <div className="preview-img-container square-ratio">
          <Carousel>
            {stay.imgUrls.map((imgUrl) => <img key={stay._id} src={imgUrl} alt="image" />)}
          </Carousel>
        </div> */}


        <div className="preview-img-container square-ratio">
          <img src={stay.imgUrls[0]} alt="image" />
          <FavoriteBorderIcon className="preview-img-like"/>
        </div>

        {/* <div className="preview-img-like"><FavoriteBorderIcon /></div> */}
        <div className="stay-info">
          <p className="stay-name">{`${stay.loc.city}, ${stay.loc.country}`} <span><StarIcon className="star"/>4.95</span></p>
          <p className="stay-distance">1,109 kilometers</p>
          <p className="stay-date">Nov 30 - Dec 5</p>
        </div>
        <p className="stay-price">{`$${stay.price} night`}</p>
      </Link>
      {/* <Link to={`/stay/edit/${stay._id}`}>Edit</Link> */}
    </li>
  )
}