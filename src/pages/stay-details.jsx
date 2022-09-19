import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { stayService } from '../services/stay.service.local'

// MUI page Icons
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// MUI stayTitles icons
import WifiIcon from '@mui/icons-material/Wifi'


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

    // if(stay.titles)console.log('stay.titles',stay.titles)
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

        <div className="flex space-between stay-title">
            <div>
                <h2>
                    <span>{`${stay.type}`}</span>
                    {`hosted by `}
                    <span>{`${stay.host.fullname}`}</span>
                </h2>
                
                <div>
                    <span>{`${stay.capacity} guest${pluralTxt(stay.capacity)}`}</span>
                    <span>{`${stay.stayMap.bedroom} bedroom${pluralTxt(stay.stayMap.bedroom)}`}</span>
                    <span>{`${stay.stayMap.bed} bad${pluralTxt(stay.stayMap.bed)}`}</span>
                    <span>{`${stay.stayMap.bath} bath${pluralTxt(stay.stayMap.bath)}`}</span>
                </div>
            </div>

            <div>
                <img className="img-host" src={stay.host.imgUrl} alt="Host image" />
            </div>
        </div>

        <div className="flex column stay-titles">
            <div className="flex">
                <div>icon</div>
                <div>
                    <h4>title</h4>
                    <span>text title</span>
                </div>


                {/* {stay.titles.splice(0, 3).map(stayTitle =>
                <div className="flex">
                <div>icon</div>
                <div>
                    <div>title</div>
                    <span>text title</span>
                </div>
                </div>
                )} */}

            </div>
        </div>

    </section>
}