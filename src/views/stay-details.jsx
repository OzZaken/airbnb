import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local'
import { StayOrder } from '../cmps/stay/order'
import { StayPreview } from '../cmps/stay/stay-preview'
import AppIcon from '../cmps/app-icon'
import { GoogleMap } from '../cmps/helper/map'

// Export.Modules in services?
export const StayDetails = () => {
    // * Load Stay
    const params = useParams()
    const [stay, setStay] = useState(null)
    useEffect(() => {
        document.body.classList.add("stay-details-page")
        loadStay()
        return () => {
            console.log('StayDetails return:', stay)
            document.body.classList.remove("stay-details-page")
        }
    }, [])

    const loadStay = async () => {
        const stayId = params.stayId
        setStay(await stayService.getById(stayId))
    }
    //TODO: Move to util ↓
    const pluralTxt = (num) => {
        return num > 1 ? 's ' : '  '
    }

    // * Avg rate
    const getStayAvgRate = (stay) => {
        const rates = []
        stay.reviews.forEach(review => rates.push(review.rate))
        return (rates.reduce((a, b) => (a + b)) / rates.length).toFixed(2)
    }

    // * Rooms
    const getStayRooms = (StayRoomsMap) => {
        const elRooms = []
        for (const room in StayRoomsMap) {
            elRooms.push(<li key={room} className='clean-list'>
                {`· ${StayRoomsMap[room]} ${room}${pluralTxt(room)}`}
            </li>)
        }
        return elRooms
    }

    // * Reviews
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
                        {/* <div className='clr-bright'>{`${reviews[review]._id.createdAt}`}</div> */}
                        <span>{reviewsToShow[review].txt}</span>
                    </div>
                </div>
            </li>)
        }
        return elReviews
    }

    if (!stay) return
    const StayReviewsCount = stay.reviews.length
    const stayAvgRate = getStayAvgRate(stay)
    const isShowMoreBtn = stay.summary.length >= 0 ? true : false
    const achievementsMap = stayService.getAchievements()

    return <section className="stay-details">
        <StayPreview stayAvgRate={stayAvgRate} stay={stay} />

        {/* Details */}
        <div className='flex space-between'>
            <div>
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
                                {`· ${stay.capacity} guest${pluralTxt(stay.capacity)}`}
                            </li>
                            {getStayRooms(stay.stayMap)}
                        </ul>
                    </div>

                    <div className='circle'>
                        <img className="host-img" src={stay.host.imgUrl} alt="Host image" />
                    </div>
                </div>

                {/* Achievements  */}
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

                {/* Summary */}
                <div className="stay-details-row stay-summary">
                    {stay.summary}
                    {isShowMoreBtn &&
                        <div>
                            <button className="capitalize underline">
                                <b>Show More</b>
                            </button>
                        </div>
                    }
                </div>

                {/* Amenities */}
                <div className="stay-details-row stay-amenities">
                    <div>
                        <h2>What this place offers</h2>
                    </div>

                    <div className="card-grid amenities">
                        {stay.amenities.slice().map(amenity =>
                            <div key={`${amenity}`}>
                                {amenity}
                            </div>
                        )}
                    </div>

                    <button className="btn btn-big">
                        Show all {stay.amenities.length} amenities
                    </button>

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

                {/* ↓ End Details */}
            </div>
            {/* ↑ End Details */}
            <div>
                <StayOrder stay={stay} stayAvgRate={stayAvgRate} />
            </div>
        </div>

        {/* Map */}
        <div className="stay-details-row stay-map">
            <h2>Where you'll be</h2>
            {stay.loc.city}
            <GoogleMap loc={stay.loc} />
        </div>

    </section >
}