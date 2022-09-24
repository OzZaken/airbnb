import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Services
import { stayService } from '../services/stay.service.local'
// Props
import { StayOrder } from '../cmps/stay/order'
import { StayPreview } from '../cmps/stay/stay-preview'
import AppIcon from '../cmps/icon'

export const StayDetails = () => {
    // * Load Stay
    const params = useParams()
    const [stay, setStay] = useState(null)
    useEffect(() => {
        document.body.classList.add("stay-details-page")
        loadStay()
        return () => {
            document.body.classList.remove("stay-details-page")
        }
    }, [])

    const loadStay = async () => {
        const stayId = params.stayId
        setStay(await stayService.getById(stayId))
    }

    // * Stay rate avg
    const getStayAvgRate = (stay) => {
        const rates = []
        stay.reviews.forEach(review => rates.push(review.rate))
        return (rates.reduce((a, b) => (a + b)) / rates.length).toFixed(2)
    }

    // * StayRoomsMap
    const getStayRooms = (StayRoomsMap) => {
        const elRooms = []
        for (const room in StayRoomsMap) {
            elRooms.push(<li key={room} className='clean-list'>
                {`· ${StayRoomsMap[room]} ${room}${pluralTxt(room)}`}
            </li>)
        }
        return elRooms
    }

    const pluralTxt = (num) => {
        if (!num) return '  '
        return num > 1 ? 's ' : '  '
    }

    if (!stay) return <div>Loading...</div>
    const stayAvgRate = getStayAvgRate(stay)
    const isShowMoreBtn = stay.summary.length > 0 ? true : false
    const achievementsMap = stayService.getAchievements()

    return <section className="stay-details">
        <StayPreview stayAvgRate={stayAvgRate} stay={stay} />
        <div className='flex space-between'>
            <div>
                {/* Host */}
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

                    <div>
                        <img className="img-host" src={stay.host.imgUrl} alt="Host image" />
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
            </div>

            <div>
                <StayOrder stay={stay} stayAvgRate={stayAvgRate} />
            </div>
        </div>
    </section >
}