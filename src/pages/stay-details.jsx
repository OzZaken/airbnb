import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { StayName } from '../cmps/stay-details/name'
import { stayService } from '../services/stay.service.local'
import { StayAmenities } from '../cmps/stay-details/amenities'
import { StayAchievements } from '../cmps/stay-details/achievements'
import { StayReservation } from '../cmps/stay-details/reservation'

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
    return <section className="stay-details">
        <StayName stay={stay} />
        <div className='flex space-between'>

            <div>
                <StayAchievements stay={stay} />
                <section className="air-cover-container">
                    <div className="img-air-cover">
                        <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="" />
                    </div>
                    <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                    <button className="btn underline"><b>Read more</b></button>
                </section>
                <StayAmenities stay={stay} />
            </div>

            <div>
                <StayReservation stay={stay}/>
            </div>
        </div>

    </section >
}