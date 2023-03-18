import { NavLink, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../../services/stay.service'
import { useFormRegister } from '../../hooks/useFormRegister'
import OnlyIcon, { CustomSvg } from '../app-icon'
import { useEffect, useRef } from 'react'
import { Box } from '@mui/system'
import { Skeleton } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'

export const StayFilter = ({ allAmenities, getRange, onChangeFilter, onSetFilterByAmenity,
    filterBy: { txt, placeType, amenities, priceRange, rateRange, capacityRange, dateRange }
}) => {
    // console.log(`%c Total of ${allAmenities.length} amenities filterBy ${amenities?.length || 0}`, 'color: yellowgreen;')

    const [register] = useFormRegister({
        txt, placeType,
        priceRange, rateRange, capacityRange,
        dateRange,
        amenities,
    }, onChangeFilter)

    const onOpenFilter = () => { console.log('filter Open:') }

    return <section className='stay-filter'>

        <nav className='amenities-carousel'>
            <AmenityList amenities={allAmenities} onSetFilterByAmenity={onSetFilterByAmenity} />
        </nav>

        <button onClick={onOpenFilter} className='btn-big btn-filters'>
            <TuneIcon /> Filters
        </button>

    </section>
}

const StaySort = ({ onChangeSort }) => {
    const propRef = useRef(null)
    const descRef = useRef(null)

    const onSetSortBy = () => {
        const prop = propRef.current.value
        const isDesc = descRef.current.checked

        const sortBy = { [prop]: isDesc ? -1 : 1 }
        onChangeSort(sortBy)
    }

    return <div className='stay-sort'>

        <select className="sort-by" ref={propRef}>
            <option value="price">price</option>
            <option value="rate">rate</option>
            <option value="views">views</option>
        </select>

        <label>Descending
            <input type="checkbox" className="sort-desc" ref={descRef} />
        </label>

        <button onClick={onSetSortBy}>Sort</button>
        
    </div>
}

const AmenityList = ({ amenities, onSetFilterByAmenity }) => {
    amenities.map((amenity, idx) => {
        const heading = Object.values(amenity)
        var sss = {
            heading,
            iconKey: Object.keys(amenity),
            amenityStringParam: heading.join(' ').toLowerCase().replace(/[^a-z ]+/g, '').replace(/\s+/g, '-')
        }
        return <AmenityPreview key={idx} amenity={sss} onSetFilterByAmenity={onSetFilterByAmenity} />
    })
}

const AmenityPreview = ({ amenity, onSetFilterByAmenity }) => {
    console.log(`🚀 ~ amenity:`, amenity)
    if (!amenity) return (
        <Box sx={{ display: 'flex', margin: '5px auto' }}>
        <Skeleton variant="rectangular" width={30} height={30} />
      </Box>
    )

    const { heading, iconKey, amenityStringParam } = amenity

    return <li className="amenity-preview">
        <button className={'btn-filter-by-amenity'} onClick={() => onSetFilterByAmenity(amenityStringParam)} >
            <span className='heading'>{heading}</span>
            <OnlyIcon iconKey={iconKey} />
        </button>
    </li>
}