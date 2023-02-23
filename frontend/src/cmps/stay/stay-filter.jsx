import { NavLink, useSearchParams } from 'react-router-dom'
import { useFormRegister } from '../../hooks/useFormRegister'
import { stayService } from '../../services/stay.service'
import { iconService } from '../../services/svg.service'

export const StayFilter = (props) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [register] = useFormRegister({
        model: '',
        type: '',
        minBatteryStatus: '',
        maxBatteryStatus: '',
        date: new Date(),
    }, props.onChangeFilter)

    const renderFilterByQueryParamsGPT = () => {
        const filterBy = {
            txt: searchParams.get('stay-txt') || '',
            amenities: searchParams.getAll('amenities') || [],
            maxPrice: +searchParams.get('max-price') || Infinity,
            minPrice: +searchParams.get('min-price') || 0,
            maxRate: +searchParams.get('max-rate') || Infinity,
            minRate: +searchParams.get('min-rate') || 0,
        };
        onSetFilterBy(filterBy);
    }
    const onSetFilterByGPT = (filterBy) => {
        setSearchParams({
            'stay-txt': filterBy.txt,
            'max-price': filterBy.maxPrice,
            'min-price': filterBy.minPrice,
            'max-rate': filterBy.maxRate,
            'min-rate': filterBy.minRate,
            'amenities': filterBy.amenities.join(','),
        });
    }

    const onSetFilterBy = (filterBy) => {
        const queryStringParams = `
        ?stay-txt=${filterBy.stayName}
        ?max-price=${filterBy.maxPrice}
        ?min-price=${filterBy.minPrice}
        ?max-rate=${filterBy.maxRate}
        ?min-rate=${filterBy.minRate}
        ?amenities=${filterBy.amenities.map(amenity => `&${amenity}`)}`

        const newUrl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
    }
    const renderFilterByQueryParams = () => {
        const queryParams = new URLSearchParams(window.location.search)
        const filterBy = {
            txt: queryParams.get('txt') || '',
            amenities: queryParams.get('amenities') || [], // Array.every
            maxPrice: +queryParams.get('maxPrice') || Infinity,
            minPrice: +queryParams.get('minPrice') || 0,
            maxRate: +queryParams.get('minRate') || Infinity,
            minRate: +queryParams.get('minRate') || 0,
        }

        // onSetFilterBy(filterBy)
        console.log(`🚀 ~ filterBy:`, filterBy)
    }
    const amenities = stayService.getAmenities()

    return <section className='flex-center full stay-filter'>

        <nav className='flex-grow filter-by-amenities'>
            <ul className='flex-grow flex-evenly'>
                {amenities.map((amenity, idx) => {
                    const iconKey = Object.keys(amenity)
                    const heading = Object.values(amenity)
                    const queryStringParam = heading.join(' ').toLowerCase()
                        .replace(/[^a-z ]+/g, '').replace(/\s+/g, '-')

                    return <li className="clean-list flex-center" key={idx}>
                        <NavLink to={`/q?amenity=${queryStringParam}`} className={'link-filter-by'}>
                            <h5 className='flex'>{heading}</h5>
                            <i className='filter-svg'>{iconService[iconKey]()}</i>
                        </NavLink>
                    </li>
                })}

            </ul>
        </nav>

        <button className='btn'>Filters {iconService.FilterBy()}</button>
    </section>
}