import { NavLink, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { stayService } from '../../services/stay.service'
import { useFormRegister } from '../../hooks/useFormRegister'
import OnlyIcon, {CustomSvg } from '../app-icon'
import { useEffect } from 'react'

export const StayFilter = ({ filterBy, onChangeFilter, onSetFilterByAmenity, getRange }) => {
    useEffect(() => {
        console.log(`🚀 ~ filterBy:`, filterBy)
        console.log('prices:', getRange('price'))
        console.log('capacities:', getRange('capacity'))
        return () => {
        }
    }, [])

    const {
        txt, placeType,
        priceRange, rateRange, capacityRange,
        bookingRange,
        amenities,
    } = filterBy

    const [register] = useFormRegister({
        txt, placeType,
        priceRange, rateRange, capacityRange,
        bookingRange,
        amenities,
    }, onChangeFilter)

    const onOpenFilter = () => {
        console.log('filter Open:')
    }

    return <section className='stay-filter'>
        {/* filter by amenity */}
        <nav className='filter-by-container'>
            <ul className='full filter-nav-list'>
                {stayService.getAmenities().map((amenity, idx) => {
                    const iconKey = Object.keys(amenity)
                    const heading = Object.values(amenity)
                    const amenityStringParam = heading.join(' ').toLowerCase()
                        .replace(/[^a-z ]+/g, '')
                        .replace(/\s+/g, '-')

                    return <li className="clean-list flex-center" key={idx}>
                        <button onClick={() => onSetFilterByAmenity(amenityStringParam)} className={'link-filter-by'}>
                            <h3 className='flex'>{heading}</h3>
                            <span className='icon'><OnlyIcon iconKey={iconKey} /></span>
                        </button>
                    </li>
                })}
            </ul>
            {/* btns-ref-amenity */}
            <button hidden className='btn-circle btn-prev-filter'>&#62;</button>
            <button className='btn-circle btn-next-filter'>&#62;</button>
        </nav>

        {/* btn-Filters */}
        <button onClick={onOpenFilter} className='btn-big btn-filters'>
            <OnlyIcon iconKey="FilterBy" />Filters
        </button>
    </section>
}