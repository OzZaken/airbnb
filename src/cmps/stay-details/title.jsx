import AppIcon from '../icon'
import { Link } from 'react-router-dom'

export const StayTitle = ({ stay }) => {

    const pluralTxt = (num) => {
        if (!num) return ' '
        return num > 1 ? 's ' : ' '
    }

    if (!stay) return <div>Loading...</div>
    return <section className="stay-title">
        <h1>{stay.name}</h1>
        {/* Rate Row */}
        <div className="flex space-between rate">
            <div className='align-center'>
                <span><AppIcon iconKey='star' /></span>
                <span>4.75</span>   {/* <StayAvg/> */}
                <Link to="/" className="underline reviews"> 14 reviews</Link>
                <Link className="underline address">{`· ${stay.loc.address}, ${stay.loc.country}`}</Link>
            </div>

            <div>
                <button className="underline">
                    <AppIcon iconKey='share' /> share
                </button>
                <button className="underline">
                    <AppIcon iconKey='heart' />save
                </button>
            </div>

        </div>
        {/* imgs-preview */}
        <div className="imgs-grid-container imgs-preview">
            {stay.imgUrls.splice(0, 5).map(imgUrl =>
                <div key={imgUrl}>
                    <img src={imgUrl} alt="Stay image" />
                </div>)}
        </div>
        {/* stay-title → preview with params in props? */}
        <div className="flex space-between stay-title">
            <div className="flex column space-between">
                <h2>
                    <span>{`${stay.type} `}</span>
                    {`hosted by ${stay.host.fullname}`}
                </h2>

                <div>
                    <span>{`· ${stay.capacity} guest${pluralTxt(stay.capacity)}`}</span>
                    <span>{`· ${stay.stayMap.bedroom} bedroom${pluralTxt(stay.stayMap.bedroom)}`}</span>
                    <span>{`· ${stay.stayMap.bed} bad${pluralTxt(stay.stayMap.bed)}`}</span>
                    <span>{`· ${stay.stayMap.bath} bath${pluralTxt(stay.stayMap.bath)}`}</span>
                </div>
            </div>

            <div>
                <img className="img-host" src={stay.host.imgUrl} alt="Host image" />
            </div>
        </div>

    </section>

}