import { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
// Services
import { stayService } from '../services/stay.service.local'
// Props
import { StayAmenities } from '../cmps/stay/props/amenities'
import { StayAchievements } from '../cmps/stay/props/achievements'
import { StayOrder } from '../cmps/stay/order'
import { StayHost } from '../cmps/stay/props/host'
import { StayPreview } from '../cmps/stay/stay-preview'
import { StaySummary } from '../cmps/stay/props/summery'
// Cmps
import { AirCover } from '../cmps/air-cover'

export const StayDetails = (props) => {
    //    Load Stay
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

    if (!stay) return <div>Loading...</div>
    const stayAvgRate = getStayAvgRate(stay)
    return <section className="stay-details">
        <StayPreview stayAvgRate={stayAvgRate} stay={stay} />
        <div className='flex space-between'>
            <div>
                <StayHost stay={stay} />
                <StayAchievements achievements={stay.achievements} />
                <AirCover />
                <StaySummary summary={stay.summary} />
                <StayAmenities amenities={stay.amenities} />
            </div>

            <div>
                <StayOrder stay={stay} stayAvgRate={stayAvgRate} />
            </div>
        </div>
    </section >
}
