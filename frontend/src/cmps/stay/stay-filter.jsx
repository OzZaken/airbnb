import { NavLink, useSearchParams } from 'react-router-dom'
import { useFormRegister } from '../../hooks/useFormRegister'
import { stayService } from '../../services/stay.service'
import { iconService } from '../../services/svg.service'

export const StayFilter = (props) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [register] = useFormRegister({
        txt: '',
        type: '',
        amenities: [],
        maxPrice: Infinity,
        minPrice: 0,
        maxRate: Infinity,
        minRate: 0,
        fromDate: new Date(),
        toDate: new Date(Infinity),
    }, props.onChangeFilter)
   
    const renderFilterByQueryParamsGPT = () => {
        const filterBy = {
            txt: searchParams.get('txt') || '',
            type: searchParams.get('type') || '',
            amenities: searchParams.getAll('amenities') || [],
            maxPrice: +searchParams.get('max-price') || Infinity,
            minPrice: +searchParams.get('min-price') || 0,
            maxRate: +searchParams.get('max-rate') || Infinity,
            minRate: +searchParams.get('min-rate') || 0,
            fromDate: searchParams.get('from-date') || new Date(),
            todoDate: searchParams.get('to-date') || new Date(Infinity),
        }
        onSetFilterBy(filterBy)
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
const {FilterBy} = iconService
    return <section className='stay-filter'>

        <nav className='flex filter-by-container'>
            
            <ul className='filter-nav-list'>
                
                {amenities.map((amenity, idx) => {
                    const iconKey = Object.keys(amenity)
                    const heading = Object.values(amenity)
                    const queryStringParam = heading.join(' ').toLowerCase()
                        .replace(/[^a-z ]+/g, '').replace(/\s+/g, '-')
                    
                    return <li className="clean-list flex-center" key={idx}>
                        <NavLink to={`/q?amenities=${queryStringParam}`} className={'link-filter-by'}>
                            <h3 className='flex'>{heading}</h3>
                            <i className='icon'>{iconService[iconKey]()}</i>
                        </NavLink>
                    </li>
                })}
            </ul>
        </nav>

        <button className='btn'>Filters {FilterBy()}</button>
    </section>
}