import { NavLink, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../../services/stay.service'
import { useFormRegister } from '../../hooks/useFormRegister'
import OnlyIcon, { CustomSvg } from '../app-icon'
import { useEffect, useRef } from 'react'

export const StayFilter = ({ filterBy, onChangeFilter, onSetFilterByAmenity, getRange }) => {


    const {
        txt, placeType,
        amenities,
        priceRange, rateRange,
        capacityRange, bookingRange,
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

            <ul className='filter-nav-list'>

                {stayService.getAmenities().map((amenity, idx) => {
                    const iconKey = Object.keys(amenity)
                    const heading = Object.values(amenity)
                    const amenityStringParam
                        = heading.join(' ').toLowerCase()
                            .replace(/[^a-z ]+/g, '')
                            .replace(/\s+/g, '-')


                    return <li className="clean-list flex-center" key={idx}>
                        <button className={'btn-filter-by-amenity'} onClick={() => onSetFilterByAmenity(amenityStringParam)} >
                            <span className='amenity-heading'>{heading}</span>
                            <OnlyIcon iconKey={iconKey} />
                        </button>
                    </li>
                })}
            </ul>

            {/* btns-ref-amenity */}{/*hidden */}
            <button className='btn-circle btn-prev-filter'>&lt;</button>
            <button className='btn-circle btn-next-filter'>&gt;</button>
        </nav>

        {/* btn-Filters */}
        <button onClick={onOpenFilter} className='btn-big btn-filters'>
            <OnlyIcon iconKey="FilterBy" />Filters
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

    return (
        <div className='stay-sort'>

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
    );
}