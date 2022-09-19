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
    // todo: ↓ export from other page?
    const gStayTitles = {
        "superHost": {
            "heading": "is a Superhost",
            "txt": "Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.",
        },
        "greatLoc": {
            "heading": "Great location",
            "txt": "100% of recent guests gave the location a 5-star rating.",
        },
        "greatCheckIn": {
            "heading": "Great check-in experience",
            "txt": "100% of recent guests gave the check-in process a 5-star rating.",
        },
        "workspace": {
            "heading": "Dedicated workspace",
            "txt": "A private room with wifi that`s well-suited for working.",
        },
        "selfCheckIn": {
            "heading": "Self check-in",
            "txt": "You can check in with the doorman.",
        },
        "petsFriendly": {
            "heading": "Furry friends welcome",
            "txt": "Bring your pets along for the stay.",
        },
        "fastWifi": {
            "heading": "Fast wifi",
            "txt": "At 62 Mbps, you can take video calls and stream videos for your whole group.",
        },
    }
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

    const pluralTxt = (num) => {
        if (!num) return ' '
        return num > 1 ? 's ' : ' '
    }

    //todo: ↓ 
    // const StayAvg = () => {
    // if(!stay.reviews||stay.reviews===0) return 'New stay'
    //     stay.reviews.rate
    //     nums.reduce((a, b) => (a + b)) / nums.length
    // }

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

        {/* <StayTitles /> */}
        <div className="hr flex column stay-titles">
            {/* {stay.titles.splice(0, 3).map(stayTitle =>
                <div className="flex">
                    <div>{gStayTitles[stay.titles[0]].icon}</div>
                    <div>
                        <div>title</div>
                        <span>text title</span>
                    </div>
                </div>
            )} */}

            <div className="flex">
                <div><WifiIcon /></div>
                <div>
                    <h4>{gStayTitles[stay.titles[0]].heading}</h4>
                    <span>{gStayTitles[stay.titles[0]].txt}</span>
                </div>
            </div>
            <div className="flex">
                <div><WifiIcon /></div>
                <div>
                    <h4>{gStayTitles[stay.titles[1]].heading}</h4>
                    <span>{gStayTitles[stay.titles[1]].txt}</span>
                </div>
            </div>
            <div className="flex">
                <div><WifiIcon /></div>
                <div>
                    <h4>{gStayTitles[stay.titles[2]].heading}</h4>
                    <span>{gStayTitles[stay.titles[2]].txt}</span>
                </div>
            </div>
        </div>

        {/* <AirCover /> */}
        <div className="hr air-cover-container">
            {/* // todo: make div bgc as imgUrl */}
            <div className="img-air-cover">
                <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="" />
            </div>
            <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            <button className="btn underline"><b>Read more</b></button>
        </div>
        {/* <StayAmenities/> */}
        <div>
            <h2>What this place offers</h2>
            {stay.amenities.map(amenity => <div>{amenity}</div>)}
            <button className="btn btn-big">Show all {stay.amenities.length} amenities</button>
        </div>


    </section >
}