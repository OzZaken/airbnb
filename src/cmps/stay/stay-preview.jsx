import { useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router-dom"
import AppIcon from "../icon"
import { StayRate } from "./props/rate"
import { StaySaveBtn } from "./props/save"
import { StayShareBtn } from "./props/share"

export function StayPreview({ stay, inHomePage,stayAvgRate }) {
    const navigate = useNavigate()
    const [idx, setIdx] = useState(0)

    // TODO: setIsLiked↓
    let [isLiked, setIsLiked] = useState()
    // TODO: favorite ↓
    const addFavoriteList = () => {
        // setIsLiked(!isLiked)
        // heartPic = heartRed
    }
    //TODO: Move getStayAvgRate to root cmp
    const getStayAvgRate = (stay) => {
        const rates = []
        stay.reviews.forEach(review => {
            rates.push(review.rate)
        })
        return rates.reduce((a, b) => (a + b)) / rates.length
    }

    if (!stay) return // TODO: Skeleton
    return (inHomePage)
        ? <div onClick={() => { navigate(`stay/${stay._id}`) }}
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
                <div className="capitalize">{`${stay.loc.city},${stay.loc.country}`}</div>
                <span>
                    <StayRate
                        rate={getStayAvgRate(stay)}
                        reviewsCount={stay.reviews.length - 1}
                        isReviewBtnShow={false}
                    />
                </span>
            </div>

            <div className="clr-bright">
                <div>9,621 kilometers</div>
                <div>Dec 20 - 25</div>
            </div>
            ${stay.price} night
        </div>

        : <div className="details-page-preview">
            <h1>{stay.name}</h1>
            <div className="flex space-between">

                <div className="flex space-between">
                    <StayRate
                        rate={stayAvgRate}
                        reviewsCount={stay.reviews.length - 1}
                        isReviewBtnShow={true}
                    />
                    &#xB7;{`${stay.loc.city},${stay.loc.country}`}
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