import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import StarIcon from '@mui/icons-material/Star'
import Carousel from 'react-material-ui-carousel'
import heartIcon from '../../assets/img/heart-icon.svg'
import heartRed from '../../assets/img/heart-red.svg'
import arrowRight from '../../assets/img/arrow-right.svg'
import arrowLeft from '../../assets/img/arrow-left.svg'


export const StayPreview = ({ stay }) => {

  // const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  // const { likedByUsers } = stay
  var heartPic = heartIcon
  var [idx, setIdx] = useState(0)
  var [isLiked, setIsLiked] = useState(false)

  // const addLikedList = () => {
  //   setIsLiked(!isLiked)
  //   if (!likedByUsers.includes(loggedInUser))
  //     likedByUsers.push(loggedInUser)
  //   else likedByUsers.pop()
  // }

  const addLikedList = () => {
    setIsLiked(!isLiked)
    heartPic = heartRed
  }

  const moveIndex = () => {
    if ((idx + 1) >= stay.imgUrls.length) idx = 0
    else idx++
    setIdx(idx)
  }

  // if (!stay.isLiked) heartPic = heartIcon
  // else heartPic = heartRed
  // if (!stay) return

  return (
    <li className="clean-list stay-preview">

      {/* <div className="preview-img-container square-ratio">
          <Carousel>
            {stay.imgUrls.map((imgUrl) => <img key={imgUrl} src={imgUrl} alt="image" />)}
          </Carousel>
        </div> */}

      <Link to={`/stay/${stay._id}`}>
        <div className="preview-img-container square-ratio">
          <img className="preview-img" src={stay.imgUrls[idx]} alt="image" />
        </div>
        <img className="heart-icon" src={heartPic} onClick={(ev) => { ev.preventDefault(); addLikedList() }} />
        <div className="arrow-btn" onClick={(ev) => { ev.preventDefault(); moveIndex() }}>
          <img className="arrow-right" src={arrowRight} />
          <img className="arrow-left" src={arrowLeft} />
        </div>
        <div>
        </div>
      </Link>

        <div className="stay-info">
          <p className="stay-name">{`${stay.loc.city}, ${stay.loc.country}`} <span><StarIcon className="star" />4.95</span></p>
          <p className="stay-distance">1,109 kilometers</p>
          <p className="stay-date">Nov 30 - Dec 5</p>
        </div>
        <p className="stay-price">{`$${stay.price} night`}</p>
       
    </li>
  )
}