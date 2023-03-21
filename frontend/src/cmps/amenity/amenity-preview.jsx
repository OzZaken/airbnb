import { Box } from '@mui/system'
import { Skeleton } from '@mui/material'
import IconApp from '../app-icon'

export const AmenityPreview = ({ amenity, cb, isContainsTitle, isContainsIcon }) => {
    const title = Object.values(amenity)
    const amenityKey = Object.keys(amenity)

    var previewProps = {
        className: `amenity-preview`,
        'data-amenity': `amenity-preview`,
    }

    if (cb && typeof cb === 'function') {
        previewProps = {
            ...previewProps,
            className: `btn amenity-preview`,
            role: `button`,
            onClick: () => cb(amenityKey)
        }
    }

    return !amenity ? (
        <Box sx={{ display: 'flex', margin: '5px auto' }}>

            <Skeleton variant="circle" width={30} height={30} />
        </Box>

    ) : <li {...previewProps} >

        {isContainsTitle && <span className='amenity-title'>{title}</span>}

        {isContainsIcon && <IconApp iconKey={amenityKey} />}
    </li>
}