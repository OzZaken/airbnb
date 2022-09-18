import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local'

// MUI
import IosShareIcon from '@mui/icons-material/IosShare';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const StayDetails = () => {
    const [stay, setStay] = useState(null)
    const params = useParams()
    useEffect(() => {
        loadStay()
    }, [params.id])

    const loadStay = async () => {
        const stayId = params.stayId
        const stay = await stayService.getById(stayId)
        setStay(stay)
    }

    // const StayAvg = () => {
    //     stay.reviews.rate
    //     nums.reduce((a, b) => (a + b)) / nums.length
    // }

    console.log('stay:', stay)
    if (!stay) return <div>Loading...</div>
    return (
        <section className="grid details">
            <h1>{stay.name}</h1>

            <div className="flex space-between rate">
               
                <div>
                    <span><StarRateIcon /></span>
                    <span>4.75</span>
                    {/* <StayAvg/> */}
                    <Link className="reviews"> 14 reviews</Link>
                    <span className="address">{` ${stay.loc.address},${stay.loc.country}`}</span>
                </div>

                <div>
                    <span><IosShareIcon /> share</span>
                    <span><FavoriteBorderIcon />save</span>
                </div>

            </div>

            <div className="imgs-grid-container">
                {stay.imgUrls.splice(0, 5)
                    .map(imgUrl => <div key={imgUrl}>
                        <img src={imgUrl} alt="Stay image" />
                    </div>
                    )}
            </div>

            <h2>{`${stay.type} hosted by ${stay.host.fullname}`}</h2>
            <h3>4 guests  1 bedroom  2 beds  1 bath </h3>
            <h3>{`${stay.capacity} guests`}</h3>
        </section>
    )
}