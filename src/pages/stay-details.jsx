import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { stayService } from '../services/stay.service.local'
import { StayAmenities } from '../cmps/stay-details/amenities'
import { StayAchievements } from '../cmps/stay-details/achievements'
import { StayReservation } from '../cmps/stay-details/reservation'
import { StayHost } from '../cmps/stay-details/host'
import { SPreview } from '../cmps/stay-details/preview'
import { AirCover } from '../cmps/stay-details/air-cover'
import { StaySummary } from '../cmps/stay-details/summery'

export const StayDetails = () => {
    const [stay, setStay] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadStay()
    }, [params.id])

    const loadStay = async () => {
        const stayId = params.stayId
        setStay(await stayService.getById(stayId))
    }

    // todo: const StayAvg = () => {
    // if(!stay.reviews||stay.reviews===0||stay.createAt...) return 'New stay'
    //     stay.reviews.rate
    //     nums.reduce((a, b) => (a + b)) / nums.length
    // }

    if (!stay) return <div>Loading...</div>
    console.log('stay:', stay)
    return <section className="stay-details">
        <SPreview stay={stay} />
        <div className='flex space-between'>
            <div>
                <StayHost  stay={stay} />
                <StayAchievements achievements={stay.achievements} />
                <AirCover />
                <StaySummary summary={stay.summary}/>
                <StayAmenities amenities={stay.amenities} />
            </div>

            <div>
                <StayReservation stay={stay} />
            </div>
        </div>
    </section >
}