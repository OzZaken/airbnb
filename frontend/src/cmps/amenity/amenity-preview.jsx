import { Box } from '@mui/system'
import { Skeleton } from '@mui/material'

export const AmenityPreview = ({ amenity, onClick, imgMap }) => {
    const title = Object.values(amenity)
    const amenityKey = Object.keys(amenity)
  
    const amenityPreviewProps = {
        'data-filter-by': amenityKey,
        className: `amenity-preview`,
    }

    if (onClick && typeof onClick === 'function') amenityPreviewProps.onClick = () => onClick(amenityKey)
    return !imgMap[amenityKey] ? <LoaderAmenity /> : <li {...amenityPreviewProps} >

        <button className='btn btn-filter-by-amenity' value={amenityKey}>

            <span className='amenity-title'>{title}</span>

            <img className='amenity-img' role={'presentation'} src={imgMap[amenityKey]} alt={title} />
        </button>
    </li>
}

const LoaderAmenity = () => {
    return <Box sx={{ display: 'flex', margin: '5px auto' }}>
        <Skeleton variant="circle" width={30} height={30} />
    </Box>
}