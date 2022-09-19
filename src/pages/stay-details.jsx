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

    // const reviewsCount = () =>{
    // if(!stay.reviews||stay.reviews===0) return 'New stay'
    // }

    const pluralTxt = (num) => {
        if (!num) return ' '
        return num > 1 ? 's ' : ' '
    }

    if (!stay) return <div>Loading...</div>
    return <section className="stay-details">
            <h1>{stay.name}</h1>

            <div className="flex space-between rate">
                <div>
                    <span><StarRateIcon /></span>
                    <span>4.75</span>   {/* <StayAvg/> */}
                    <Link to="/" className="underline reviews"> 14 reviews</Link>
                    <span>·</span>
                    <Link className="underline address">{` ${stay.loc.address}, ${stay.loc.country}`}</Link>
                </div>

                <div>
                    <button><IosShareIcon /> share</button>
                    <button><FavoriteBorderIcon />save</button>
                </div>

            </div>

            <div className="imgs-grid-container imgs-preview">
                {stay.imgUrls.splice(0, 5).map(imgUrl =>
                    <div key={imgUrl}>
                        <img src={imgUrl} alt="Stay image" />
                    </div>)}
            </div>

            <div className="hr flex space-between">
                <div>
                    <h2>{`${stay.type} hosted by ${stay.host.fullname}`}</h2>
                    <div>
                        <span>{`${stay.capacity} guest${pluralTxt(stay.capacity)}`}</span>
                        <span>{`${stay.stayMap.bedroom} bedroom${pluralTxt(stay.stayMap.bedroom)}`}</span>
                        <span>{`${stay.stayMap.bed} bad${pluralTxt(stay.stayMap.bed)}`}</span>
                        <span>{`${stay.stayMap.bath} bath${pluralTxt(stay.stayMap.bath)}`}</span>
                    </div>
                </div>

                <div className="img-host">
                    <img src={stay.host.imgUrl} alt="Host image" />
                </div>
            </div>

        </section>
}