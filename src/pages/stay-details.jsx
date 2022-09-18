import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local'
import IosShareIcon from '@mui/icons-material/IosShare';
import StarRateIcon from '@mui/icons-material/StarRate';

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


    if (!stay) return <div>Loading...</div>
    return (
        <section className="stay-details">
            <h1>{stay.name}</h1>
            <div className="details flex align-center">
                <div className="rate flex">
                    <StarRateIcon /> 4.75
                </div>
                <p className="reviews">(154 reviews)</p>
                <p className="address">{`${stay.loc.address},${stay.loc.country}`}</p>
            </div>
            <div className="imgs-grid-container">

                {stay.imgUrls.splice(5).map((imgUrl) => <div>
                    <img src={imgUrl} alt="Stay image" />
                </div>)}
            </div>

            <h2>{`${stay.type} hosted by ${stay.host.fullname}`}</h2>

            <h3>4 guests  1 bedroom  2 beds  1 bath </h3>



        </section>
    )
}
