import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AppIcon from "../icon"
import { StayLocation } from "./props/location"
import { StayRate } from "./props/rate"
import { StaySaveBtn } from "./props/save"
import { StayShareBtn } from "./props/share"
// TODO:: Carousel on same modal
// import Carousel from 'react-material-ui-carousel'

export function StayPreview({ stay, inHomePage }) {
    let [idx, setIdx] = useState(0)
    const moveImgIndex = (num) => {
        if (idx >= stay.imgUrls.length -1&& num === 1) {
            idx = 0
            num = 0
        }
        if (idx <= 0 && num === -1) {
            idx = stay.imgUrls.length - 1
            num = 0
        }
        idx += num
        setIdx(idx)
    }

    // TODO: setIsLiked↓
    let [isLiked, setIsLiked] = useState({})

    // TODO:: navigate ↓
    const navigate = useNavigate()
    const addFavoriteList = () => {
        // setIsLiked(!isLiked)
        // heartPic = heartRed
    }

    if (!stay) return // TODO:: Skeleton
    return (inHomePage)
        ? <div className="home-page-preview">
            <Link to={`/stay/${stay._id}`}>
              
                <div className="preview-img-container square-ratio"
                    style={{ background: `url(${stay.imgUrls[idx]})` }}
                >
                    <div className='flex space-between preview-btns-container'
                        onClick={(ev) => {
                            console.log('useNavigate?', ev)
                            ev.stopPropagation();
                            ev.preventDefault();
                        }}>

                        <div className="btn-add-favorite">
                            <AppIcon iconKey="heart"
                                onClick={(ev) => {
                                    console.log('click on heart:', ev)
                                    ev.stopPropagation();
                                    ev.preventDefault();
                                    addFavoriteList()
                                }} />
                        </div>

                        <div className="circle btn-img-back"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                ev.preventDefault();
                                moveImgIndex(-1)
                            }}
                        >
                            <AppIcon iconKey="arrowBack" />
                        </div>

                        <div className="circle btn-img-forward"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                ev.preventDefault();
                                moveImgIndex(1)
                            }}
                        >
                            <AppIcon iconKey="arrowForward" />
                        </div>
                    </div>
                </div>
            </Link>
            <div className="stay-info">

                <p className="stay-name">
                    <StayLocation loc={stay.loc} />
                    <AppIcon className="star" iconKey="star" />
                    4.95
                </p>

                <p className="stay-distance">
                    {/* TODO:: check how to Geolocation  */}
                    1,109 kilometers
                </p>

                <p className="stay-date">
                    {/* TODO:: check what need to show  */}
                    Nov 30 - Dec 5
                </p>

                <p className="stay-price">
                    {`$${stay.price} night`}
                </p>

            </div>
        </div>

        : <div className="details-page-preview">
            <h1>{stay.name}</h1>
            <div className="flex space-between">

                <div className="flex space-between">
                    <StayRate reviews={stay.reviews} />
                    <StayLocation loc={stay.loc} />
                </div>

                <div className="flex space-between">
                    <StayShareBtn />
                    <StaySaveBtn />
                </div>
            </div>

            <div className="imgs-grid-template imgs-preview">
                {stay.imgUrls.slice(0, 5).map((imgUrl, idx) =>
                    <img src={imgUrl}
                        key={`${imgUrl}-${idx}`}
                        alt={`Stay image ${idx}`} />
                )}
            </div>
        </div>

}