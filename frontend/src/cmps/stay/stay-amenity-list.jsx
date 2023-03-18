import { Box } from '@mui/system'
import { Skeleton } from '@mui/material'
import IconApp from '../app-icon'

export const AmenityList = ({ amenities, onSetFilterByAmenity }) => {
   return <ul className="amenities-list">
   {amenities.map((amenity, idx) => <AmenityPreview key={idx} amenity={amenity} onSetFilterByAmenity={onSetFilterByAmenity}/>)}
   </ul>
}

const AmenityPreview = ({ amenity, onSetFilterByAmenity }) => {
    const heading = Object.values(amenity)
    const iconKey = Object.keys(amenity)
    const amenityStringParam = heading.join(' ').toLowerCase().replace(/[^a-z ]+/g, '').replace(/\s+/g, '-')
    return !amenity ? (
        <Box sx={{ display: 'flex', margin: '5px auto' }}>
            <Skeleton variant="rectangular" width={30} height={30} />
        </Box>
    ) : <li className="amenity-preview">
        <button className={'btn-filter-by-amenity'} onClick={() => onSetFilterByAmenity(amenityStringParam)} >
            <span className='heading'>{heading}</span>
            <IconApp iconKey={iconKey} />
        </button>
    </li>
}