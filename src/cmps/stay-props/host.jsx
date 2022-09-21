export const StayHost = ({ stay }) => {
    if (!stay) return
   
    const pluralTxt = (num) => {
        if (!num) return ' '
        return num > 1 ? 's ' : ' '
    }
    
    return <div className="flex space-between stay-details-row stay-host">
        <div className="flex column space-between">
            <h2>
                {/* //todo choose on way to capitalize */}
                <span className='capitalize'>{`${stay.type}`}</span>
                hosted by
                <span>{` ${stay.host.fullname}`}</span>
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
}