import { useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router-dom"
import { StayLocation } from "./props/location"
import AppIcon from "../icon"
import { StayRate } from "./props/rate"
import { StaySaveBtn } from "./props/save"
import { StayShareBtn } from "./props/share"

export function StayPreview({ stay, inHomePage }) {
    const navigate = useNavigate()
    const [idx, setIdx] = useState(0)

    // TODO: setIsLiked↓
    let [isLiked, setIsLiked] = useState()
    // TODO: favorite ↓
    const addFavoriteList = () => {
        // setIsLiked(!isLiked)
        // heartPic = heartRed
    }

    if (!stay) return // TODO: Skeleton
    console.log(...stay.reviews)
    return (inHomePage)
        ? <li onClick={() => { navigate(`stay/${stay._id}`) }}
            className="home-page-preview">
            <Carousel autoPlay={false}>
                {stay.imgUrls.slice().map((imgUrl, idx) =>
                    <div key={`${imgUrl}-${idx}`} className="square-ratio carousel-preview">
                        <img src={imgUrl} alt={`Stay image ${idx}`} />
                    </div>
                )}
            </Carousel>

            <div
                className="flex space-between">

                <button className="btn-link">
                    {stay.loc.country}
                </button>

                <StayLocation />
                <span>
                <StayRate
                        rate={stay.reviews.rate}
                        reviewsCount={stay.reviews.length - 1}
                        isReviewBtnShow={false}
                    />
                    {/*//? {stay.reviews.reduce(?)} */}
                </span>
            </div>

            <div>
                <div>9,621 kilometers</div>
                <div>Dec 20 - 25</div>
            </div>
            ${stay.price} night
        </li>

        : <div className="details-page-preview">
            <h1>{stay.name}</h1>
            <div className="flex space-between">

                <div className="flex space-between">
                    <StayRate
                        rate={stay.reviews.rate}
                        reviewsCount={stay.reviews.length - 1}
                        isReviewBtnShow={true}
                    />
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
                        //TODO: Fix grid with ratio
                        // className={`${idx === 0 ? `portrait-ratio` : `square-ratio`}`}
                        key={`${imgUrl}-${idx}`}
                        alt={`Stay image ${idx}`} />
                )}
            </div>
        </div>
}
// https://www.youtube.com/watch?v=SK9AlIbexOE
// https://www.npmjs.com/package/react-material-ui-carousel