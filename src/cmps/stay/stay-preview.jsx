import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import AppIcon from '../icon'
import { background } from '@chakra-ui/react'

export const StayPreview = ({ stay }) => {
  // const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  // const { likedByUsers } = stay
  let [idx, setIdx] = useState(0)
  let [isLiked, setIsLiked] = useState({})

  const addFavoriteList = () => {
    // setIsLiked(!isLiked)
    // heartPic = heartRed
  }

  const moveImgIndex = () => {
    if (idx >= stay.imgUrls.length - 1) idx = 0
    else idx++
    setIdx(idx)
  }

  return <li className="clean-list stay-preview">

    {/* <Carousel>
            {stay.imgUrls.map((imgUrl) => <img key={imgUrl} src={imgUrl} alt="image" />)}
          </Carousel> */}

    <Link to={`/stay/${stay._id}`}>

    {/* {{color: "red"}} */}
      <div className="preview-img-container square-ratio" 
      // style={{ backgroundImage: ``}}
      >
        <img className="preview-img" src={stay.imgUrls[idx]} alt="image" />
      </div>

      <AppIcon className="heart-icon" iconKey="heart" onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); addFavoriteList() }} />

      <div className="arrow-btn"
        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); moveImgIndex() }}>
        <AppIcon className="arrowRight" iconKey="arrowBack" />
        <AppIcon className="arrow-left" iconKey="arrowForward" />
      </div>

    </Link>

    <div className="stay-info">
      <p className="stay-name">{`${stay.loc.city}, ${stay.loc.country}`}
        <span><AppIcon className="star" iconKey="star" />4.95</span></p>
      <p className="stay-distance">1,109 kilometers</p>
      <p className="stay-date">Nov 30 - Dec 5</p>
    </div>
    <p className="stay-price">{`$${stay.price} night`}</p>

  </li>
}