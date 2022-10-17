import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Services
import { stayService } from '../services/stay.service.local'
import { utilService } from '../services/util.service'
// Components
import AppIcon from '../cmps/app-icon'
import { StayOrder } from '../cmps/stay/stay-order'
import { StayPreview } from '../cmps/stay/stay-preview'
import { GoogleMap } from '../cmps/helper/map'
// Loader
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const StayDetails = () => {
    // * Load Stay
    const params = useParams()
    const [stay, setStay] = useState(null)

    useEffect(() => {
        loadStay()
        document.body.classList.add("stay-details-page")
        return () => {
            document.body.classList.remove("stay-details-page")
        }
    }, [])

    const loadStay = async () => {
        const stayId = params.stayId
        setStay(await stayService.getById(stayId))
    }

    // * stay rooms
    const getStayRooms = (StayRoomsMap) => {
        const elRooms = []
        for (const room in StayRoomsMap) {
            elRooms.push(<li key={room} className='clean-list'>
                {`· ${StayRoomsMap[room]} ${room}${utilService.pluralTxt(room)}`}
            </li>)
        }
        return elRooms
    }

    // * stay reviews
    const getStayReviews = (reviewsToShow) => {
        const elReviews = []
        reviewsToShow.slice(6)
        for (const review in reviewsToShow) {
            elReviews.push(<li key={review} className='clean-list'>

                <div className='flex'>
                    <div className='circle'>
                        <img className="reviewerImg" src={`${reviewsToShow[review].by.imgUrl}`} alt={`${reviewsToShow[review].by.fullname} image`} />
                    </div>

                    <div className='flex column'>
                        <h3>{reviewsToShow[review].by.fullname}</h3>
                        {/* <div className='clr-vector'>{`${reviews[review]._id.createdAt}`}</div> */}
                        <span>{reviewsToShow[review].txt}</span>
                    </div>
                </div>
            </li>)
        }
        return elReviews
    }

    if (!stay) return <div className='main-layout'>
        <Box sx={{ display: 'flex', margin: '100px auto' }}>
            <CircularProgress />
        </Box>
    </div>

    const StayReviewsCount = stay.reviews.length
    const stayAvgRate = stayService.getStayAvgRate(stay)
    const achievementsMap = stayService.getAchievements()
    const stayRooms = getStayRooms(stay.stayMap)
    const isSummeryShowMoreBtn = stay.summary.split(' ').length >= 15

    return <section className="stay-details">
        <h1>{stay.name}</h1>
        
            <div className="flex left">
                {stayAvgRate}
                <AppIcon iconKey='star' />

                <button className="btn-link left reviews">
                    {` ${stay.reviews.length - 1 || 0} reviews `}
                </button>

                &#xB7;{`${stay.loc.city},${stay.loc.country}`}
            </div>


            <div className="flex right">
                <button className="btn-link">
                    <AppIcon iconKey='share' />
                    share
                </button>

                <button className="btn-link">
                    <AppIcon iconKey='heart' />
                    save
                </button>
            </div>

        <div className="imgs-grid-template">
            {stay.imgUrls.slice(0, 5).map((imgUrl, idx) =>
                <img src={imgUrl} key={`${imgUrl}-${idx}`}
                    alt={`${stay.name} image ${idx}`} />
            )}
        </div>

        {/* Details & Order*/}
        <div className='flex'>
            <div className='left'>
                {/* Host Info */}
                <div className="flex space-between stay-details-row stay-host">
                    <div className="flex column space-between">
                        <h2>
                            <span className='capitalize'>{`${stay.type}`}</span>
                            hosted by
                            <span>{` ${stay.host.fullname}`}</span>
                        </h2>

                        <ul className='flex'>
                            <li className='clean-list'>
                                {`· ${stay.capacity} guest${utilService.pluralTxt(stay.capacity)}`}
                            </li>
                            {stayRooms}
                        </ul>
                    </div>

                    <div className='circle'>
                        <img className="host-img" src={stay.host.imgUrl} alt="Host image" />
                    </div>
                </div>

                {/* Stay achievements  */}
                <div className="flex column stay-details-row stay-achievements">
                    {stay.achievements.slice(0, 3).map(achievement =>
                        <div className="flex" key={achievement} >
                            <div className="achievement-icon">
                                <AppIcon iconKey={achievement} />
                            </div>

                            <div className="achievement-content">
                                <div>{achievementsMap[achievement].heading}</div>
                                <span>{achievementsMap[achievement].txt}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* <AirCover /> */}
                <div className="stay-details-row air-cover-container">
                    <div className="img-air-cover">
                        <AppIcon iconKey="air-cover" />
                    </div>
                    <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                    <button className="btn-link"><b>Read more</b></button>
                </div>

                {/* Stay summary */}
                <div className="stay-details-row stay-summary">
                    {stay.summary}
                    {isSummeryShowMoreBtn &&
                        <div>
                            <button className="capitalize underline">
                                <b>Show More</b>
                            </button>
                        </div>
                    }
                </div>

                {/* Stay amenities */}
                <div className="stay-details-row stay-amenities">
                    <h2>What this place offers</h2>
                    <div className="card-grid amenities">
                        {stay.amenities.slice(0, 7).map(amenity =>
                            <div key={`${amenity}`}>
                                {amenity}
                            </div>
                        )}
                    </div>

                    {stay.amenities.length > 7 &&
                        <button className="btn btn-big">
                            Show all {stay.amenities.length} amenities
                        </button>
                    }

                </div>

            </div>

            {/* Order */}
            <div className="right">
                <StayOrder stay={stay} stayAvgRate={stayAvgRate} />
            </div>
        </div>

        {/* Reviews */}
        <div className="stay-details-row stay-reviews">
            <h2 className='flex start'>
                {stayAvgRate}
                <AppIcon iconKey='star' />
                {/* TODO: Fix→${StayReviewsCount.length > 1 ? 's ' : 'e ' */}
                {StayReviewsCount} review{`${StayReviewsCount.length > 1 ? 'e ' : 's '}`}
            </h2>

            <ul className='clean-list reviews-list'>
                {getStayReviews(stay.reviews)}
            </ul>
            <button className="btn btn-big">
                Show all {`${stay.reviews.length} review${StayReviewsCount.length > 1 ? 'e ' : 's '}`}
            </button>
        </div>

        {/* Map */}
        <div className="stay-details-row stay-map">
            <h2>Where you'll be</h2>
            {stay.loc.city}
            <GoogleMap loc={stay.loc} />
        </div>

    </section >
}