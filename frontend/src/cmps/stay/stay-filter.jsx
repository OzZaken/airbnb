import { NavLink, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { stayService } from '../../services/stay.service'
import { useFormRegister } from '../../hooks/useFormRegister'
import OnlyIcon, {CustomSvg}  from '../app-icon'
// const sortBy = {
//     [prop]: (isDesc) ? -1 : 1
// }
export const StayFilter = ({ onChangeFilter }) => {
    // get 
    const { txt, placeType, maxPrice, minPrice, maxRate, minRate, minCapacity, amenities, checkIn }
        = useSelector(state => state.stayModule.filterBy)
    // Init 
    const [searchParams, setSearchParams] = useSearchParams(
        txt, placeType, maxPrice, minPrice, maxRate, minRate, minCapacity, amenities, checkIn
    )
    // set 
    const [register] = useFormRegister({
        txt,
        placeType,
        maxPrice,
        minPrice,
        maxRate,
        minRate,
        minCapacity,
        amenities,
        checkIn,
    }, onChangeFilter)

    const renderFilterByQueryParams = () => {
        const queryParams = new URLSearchParams(window.location.search)
        const filterBy = {
            txt: queryParams.get('txt') || '',
            amenities: searchParams.getAll('amenities') || [],
            checkIn: searchParams.get('check-in') || new Date(),
            maxPrice: +searchParams.get('max-price') || Infinity,
            maxRate: +queryParams.get('max-rate') || Infinity,
            minPrice: +searchParams.get('min-price') || 0,
            minRate: +queryParams.get('min-rate') || 0,
            minCapacity: +queryParams.get('min-rate') || 0,
        }
        console.log(`🚀 ~ filterBy:`, filterBy)
        onSetFilterBy(filterBy)
    }

    const onSetFilterBy = ({
        txt, placeType, maxPrice, minPrice, minCapacity, maxRate, minRate, amenities
    }) => {
        setSearchParams({
            'txt': txt,
            'place-type': placeType,
            'max-price': maxPrice, 
            'min-price': minPrice,
            'min-capacity': minCapacity,
            'max-rate': maxRate,
            'min-rate': minRate,
            'amenities': amenities.join('&'),
        })

        const { protocol, host, pathname, queryStringParams } = window.location
        const newUrl = protocol + '//' + host + pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
    }

    const onOpenFilter = () => {
        console.log('filter Open:')
    }

    return <section className='full stay-filter'>
        <nav className='filter-by-container'>
            <ul className='full filter-nav-list'>
                {stayService.getAmenities().map((amenity, idx) => {
                    const iconKey = Object.keys(amenity)
                    const heading = Object.values(amenity)
                    const queryStringParam = heading.join(' ').toLowerCase()
                        .replace(/[^a-z ]+/g, '').replace(/\s+/g, '-')

                    return <li className="clean-list flex-center" key={idx}>
                        <NavLink to={`/q?amenities=${queryStringParam}`} className={'link-filter-by'}>
                            <h3 className='flex'>{heading}</h3>
                            <span className='icon'>
                                <OnlyIcon iconKey={iconKey} />
                            </span>
                        </NavLink>
                    </li>
                })}
            </ul>
        </nav>

        <button className='btn-circle btn-next-filter'>
        &#62;
        </button>

        <button onClick={onOpenFilter} className='btn-big btn-filters'>
            <OnlyIcon iconKey="FilterBy" />Filters
        </button>
    </section>
}