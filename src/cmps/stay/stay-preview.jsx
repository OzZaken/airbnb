import { useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router-dom"
import AppIcon from "../app-icon"

export function StayPreview({ stay, inHomePage, stayAvgRate }) {
    const navigate = useNavigate()

    // * favorite ↓
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
    const StayAvgRate = getStayAvgRate(stay)
    return (inHomePage)
        ? <div onClick={() => { navigate(`stay/${stay._id}`) }} className="btn">
            <Carousel
                //* Carousel Setting
                cycleNavigation={true}
                duration={500}
                animation="slide"
                autoPlay={false}
                //* indicatorIcon
                indicatorIconButtonProps={{
                    style: {
                        color: 'whitesmoke',
                        backgroundColor: 'transparent',
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: 'white',
                        backgroundColor: 'whitesmoke'
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        position: 'absolute',
                        zIndex: '1',
                        marginTop: "-25px"
                    },
                }}
                //* Nav btns
                navButtonsProps={{
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                    }
                }}
            >
                {stay.imgUrls.slice().map((imgUrl, idx) =>
                    <div key={`${imgUrl}-${idx}`} className="square-ratio carousel-preview">
                        <img src={imgUrl} alt={`Stay image ${idx}`} />
                    </div>
                )}
            </Carousel>

            <div className="flex space-between">
                <div className="capitalize">
                    {`${stay.loc.city},${stay.loc.country}`}
                </div>

                <span>
                    <div className="flex center">
                        {StayAvgRate}
                        <AppIcon iconKey='star' />
                    </div>
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
                    <div className="flex center">
                        {StayAvgRate}
                        <AppIcon iconKey='star' />
                    </div>
                    <button className="btn-link reviews">
                        {` ${stay.reviews.length - 1 || 0} reviews `}
                    </button>
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
            {/* className="portrait-ratio"↓ */}
            <div>
                <div className="imgs-grid-template">
                    {stay.imgUrls.slice(0, 5).map((imgUrl, idx) =>
                        <img src={imgUrl}
                            key={`${imgUrl}-${idx}`}
                            alt={`Stay image ${idx}`} />
                    )}
                </div>
            </div>
        </div>
}
// https://www.youtube.com/watch?v=SK9AlIbexOE
// https://www.npmjs.com/package/react-material-ui-carousel