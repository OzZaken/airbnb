import { useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router-dom"
import AppIcon from "../icon"
import { StayRate } from "./stay-rate"

export function StayPreview({ stay, inHomePage, stayAvgRate }) {
    const navigate = useNavigate()

    // TODO: favorite ↓
    const addFavoriteList = () => {
        // setIsLiked(!isLiked)
        // heartPic = heartRed
    }
    
    // * Stay rate avg
    const getStayAvgRate = (stay) => {
        const rates = []
        stay.reviews.forEach(review => rates.push(review.rate))
        return (rates.reduce((a, b) => (a + b)) / rates.length).toFixed(1)
    }

    if (!stay) return // TODO: Skeleton
    return (inHomePage)
        ? <div onClick={() => { navigate(`stay/${stay._id}`) }}
            className="btn">
            <Carousel
                cycleNavigation={true}
                duration={500}
                animation="slide"
                autoPlay={false}

                indicatorIconButtonProps={{
                    style: {
                        color: 'white',
                        backgroundColor: 'transparent'
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: 'whitesmoke',
                        backgroundColor: 'transparent'
                    }
                }}
                navButtonsProps={{
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        display: 'absolute',
                        // display: 'relative',
                        // top: 50,
                    }
                }}

            >
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
                    <button className="btn-link">
                        <AppIcon iconKey='share' />
                        share
                    </button>
                    <button className="btn-link">
                        <AppIcon iconKey='heart' />
                        save
                    </button>
                </div>
            </div>

            <div className="stay-img-container">
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
        </div>
}
// https://www.youtube.com/watch?v=SK9AlIbexOE
// https://www.npmjs.com/package/react-material-ui-carousel