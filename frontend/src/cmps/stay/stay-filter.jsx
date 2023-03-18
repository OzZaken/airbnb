import TuneIcon from '@mui/icons-material/Tune'
import { useFormRegister } from '../../hooks/useFormRegister'
import { AmenityList } from './stay-amenity-list'
import { CarouselApp } from '../app-carousel'

export const StayFilter = ({ allAmenities, onChangeSort, onChangeFilter, onSetFilterByAmenity, onChangeDestination,filterBy: { txt, placeType, amenities, priceRange, rateRange, capacityRange, dateRange }}) => {
    // console.log(`%c Total of ${allAmenities.length} amenities filterBy ${amenities?.length || 0}`, 'color: yellowgreen;')
 
    const [register] = useFormRegister({
        txt, placeType,
        priceRange, rateRange, capacityRange,
        dateRange,
        amenities,
    }, onChangeFilter)

    const onOpenFilter = () => { console.log('filter Open:') }

    return <section className='stay-filter'>

        <CarouselApp items={<AmenityList amenities={allAmenities} onSetFilterByAmenity={onSetFilterByAmenity}/>}/>

        <button onClick={onOpenFilter} className='btn-filters'><TuneIcon /> Filters</button>

    </section>
}

