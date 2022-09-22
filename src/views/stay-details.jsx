import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
// Services
import { stayService } from '../services/stay.service.local'
// Props
import { StayAmenities } from '../cmps/stay/props/amenities'
import { StayAchievements } from '../cmps/stay/props/achievements'
import { StayOrder } from '../cmps/stay/props/order'
import { StayHost } from '../cmps/stay/props/host'
import { SPreview } from '../cmps/stay/preview'
import { StaySummary } from '../cmps/stay/props/summery'
// Cmps
import { AirCover } from '../cmps/air-cover'

export const StayDetails = () => {
    const [stay, setStay] = useState(null)
    const location = useLocation()
    useEffect(() => {
        document.body.classList.add("stay-details-page")
        return () => {
            document.body.classList.remove("stay-details-page")
        }
    }, [])
    
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
        <SPreview stay={stay} />
        <div className='flex space-between'>
            <div>
                <StayHost stay={stay} />
                <StayAchievements achievements={stay.achievements} />
                <AirCover />
                <StaySummary summary={stay.summary} />
                <StayAmenities amenities={stay.amenities} />
            </div>

            <div>
                <StayOrder stay={stay} />
            </div>
        </div>
    </section >
}
