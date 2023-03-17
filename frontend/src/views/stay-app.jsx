import { useEffect, useReducer, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/* services */
import { utilService } from '../services/util.service'
import { translationService } from '../services/i18n.service'
/* hooks */
import { useViewEffect } from '../hooks/useViewEffect'
/* actions */
import { loadStays, removeStay, setSortBy, updateStay, setFilterBy, removeFromWishList, addToWishList } from '../store/stay.action'
import { setTitle, updateView } from '../store/system.actions'
/* cmps */
import { StayList } from '../cmps/stay/stay-list'
import { StayFilter } from "../cmps/stay/stay-filter"
/* UI UX */
import { Box, CircularProgress } from '@mui/material'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { useDebug } from '../hooks/useDebug'
// import { UNMOUNTED } from 'react-transition-group/Transition'

export const StayApp = (props) => {
    useViewEffect('home-page')
    const dispatch = useDispatch()

    useDebug('StayApp', props)/* debug */

    const { stays, filterBy } = useSelector(state => state.stayModule)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        dispatch(loadStays())
        /* queryParams*/
        if (searchParams.has('filters')) {
            const queryFilter = JSON.parse(searchParams.get('filters'))
            if (queryFilter !== filterBy) {
                console.log(' queryFilter !== filterBy')
                dispatch(setFilterBy(queryFilter))
            }
        }
    }, [])

    useEffect(() => {
        console.count('filterByChanged')
        console.log('filterBy',filterBy)
        dispatch(loadStays())
    }, [filterBy])

    /* NOTE: save only on front */
    const setAvgRate = (stay) => {
        const reviews = stay?.reviews || []
        const reviewsCount = reviews.length

        const avgRate = reviews.reduce((accRate, review) => accRate + review.rate, 0) / reviewsCount || 0

        stay.avgRate = avgRate
        return avgRate
    }

    /*  Filter  */
    const onChangeFilter = filterBy => {
        const { txt, placeType, amenities, priceRange, rateRange, capacityRange, bookingRange } = filterBy

        const [minPrice, maxPrice] = priceRange
        const [minRate, maxRate] = rateRange
        const [minCapacity, maxCapacity] = capacityRange
        const [checkIn, checkOut] = bookingRange

        const queryParams = [
            txt && `&text=${txt}`,
            placeType && `&place-type=${placeType}`,
            amenities && amenities.join('&'),
            minPrice && `&min-price=${minPrice}`, maxPrice && `&max-price=${maxPrice}`,
            minRate && `&min-rate=${minRate}`, maxRate && `&max-rate=${maxRate}`,
            minCapacity && `&min-capacity=${minCapacity}`, maxCapacity && `&max-capacity=${maxCapacity}`,
            checkIn && `&check-in=${checkIn}`, checkOut && `&check-out=${checkOut}`,
        ]
        const activeParams = queryParams.join('')
        console.log(`onChangeFilter ~ activeParams:`, activeParams)

        const filters = JSON.stringify(...activeParams)
        setSearchParams({ filters })
    }

    /*  FilterBy amenity  */
    const onSetFilterByAmenity = (amenityStringParam) => {
        console.log(`🚀 ~ onSetFilterByAmenity:`, amenityStringParam)
        const prevAmenities = searchParams.getAll('amenities')
        console.log(`🚀 ~ prevFilter:`, prevAmenities)
        // setSearchParams({ 'filter-by': { 'amenities': JSON.stringify(amenity) } })
    }

    /*  FilterBy Range [min, max] */
    const onChangeRange = (field, range) => dispatch(setFilterBy({ ...filterBy, [field]: range }))

    const getRange = (field) => {
        return stays.reduce((accRange, stay) => [
            Math.min(accRange[0], stay[field]),
            Math.max(accRange[1], stay[field])
        ], [Infinity, -Infinity])
    }

    /*  SortBy  */
    const onChangeSort = sortBy => {
        dispatch(setSortBy(sortBy))
        dispatch(loadStays())
    }

    /*  Click Preview Image */
    const navigate = useNavigate()
    const onClickPreviewImg = (idx, id) => {
        console.log(`Click Image!:`, idx,) // navigate(`/stay/${stay._id}?large-image=${idx}`)
        window.scrollTo(0, 0)
        navigate(`/stay/${id}}`)
    }

    /* Wishlist */
    const onAddToWishList = stayId => dispatch(addToWishList(stayId))
    
    const onRemoveFromWishList = stayId => dispatch(removeFromWishList(stayId))

    /* Stay */
    const onRemoveStay = stayId => dispatch(removeStay(stayId))

    const onUpdateStay = stay => dispatch(updateStay(stay))
    
    // const onLoadMoreStays = stay => dispatch(())

// dispatch({ type: 'INC_PAGE_IDX' }) // get 20 stays that already exits and load from the Api more 20 
    /* Loader */
    if (!stays) return (
        <Box sx={{ display: 'flex', margin: '100px auto' }}>
            <CircularProgress />
        </Box>
    )

    return <section className='stay-app'>
        <StayFilter filterBy={filterBy}
            onChangeFilter={onChangeFilter}
            onSetFilterByAmenity={onSetFilterByAmenity}
        />

        <StayList stays={stays}
            getRange={getRange}
            setAvgRate={setAvgRate}
            onAddToWishList={onAddToWishList}
            onRemoveFromWishList={onRemoveFromWishList}
            onClickPreviewImg={onClickPreviewImg}
            onChangeSortBy={onChangeSort}
            onRemoveStay={onRemoveStay}
            onUpdateStay={onUpdateStay}
        />
    </section>
}