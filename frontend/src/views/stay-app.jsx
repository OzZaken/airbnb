import { useEffect, useReducer, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { addStay, loadStays, removeStay, setSortBy, updateStay, setFilterBy, removeFromWishList, addToWishList } from '../store/stay.action'
import { useViewEffect } from '../hooks/useViewEffect'
import { StayList } from '../cmps/stay/stay-list'
import { StayFilter } from "../cmps/stay/stay-filter"
import ScrollTo from '../cmps/scroll-to'
// import { UNMOUNTED } from 'react-transition-group/Transition'

export const StayApp = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading, stays, filterBy } = useSelector(state => state.stayModule)
    const { loggedInUser } = useSelector(state => state.userModule)

    useEffect(() => {
        dispatch(loadStays())
        // dispatch(loadAmenities())

        /* queryParams*/
        if (searchParams.has('filters')) {
            const queryFilter = JSON.parse(searchParams.get('filters'))
            if (queryFilter !== filterBy) {
                console.log('UT queryFilter !== filterBy')
                // dispatch(setFilterBy(queryFilter))
            }
        }
    }, [])

    useViewEffect('home-page')

    const getRange = (field) => {
        return stays.reduce((accRange, stay) => [
            Math.min(accRange[0], stay[field]),
            Math.max(accRange[1], stay[field])
        ], [Infinity, -Infinity])
    }

    /* CRUD  */
    const onAddStay = stay => dispatch(addStay(stay))

    const onRemoveStay = stayId => dispatch(removeStay(stayId))

    const onUpdateStay = stay => dispatch(updateStay(stay))

    /* PAGING  */
    const onLoadMoreStays = () => dispatch({ type: 'INC_PAGE_IDX' })

    /* WISHLIST */
    const onAddToWishList = stayId => dispatch(addToWishList(stayId))

    const onRemoveFromWishList = (stayId) => dispatch(removeFromWishList(stayId))

    /* SORT  */
    const onUpdateSortBy = sortBy => dispatch(setSortBy(sortBy))

    /* Filter  */
    const onUpdateFilter = filterBy => {
        const { txt, placeType, amenities, priceRange, rateRange, capacityRange, dateRange } = filterBy

        const [minPrice, maxPrice] = priceRange
        const [minRate, maxRate] = rateRange
        const [minCapacity, maxCapacity] = capacityRange
        const [checkIn, checkOut] = dateRange

        const queryParams = [
            txt && `&text=${txt}`,
            placeType && `&place-type=${placeType}`,
            amenities && amenities.join('&'),
            minPrice && `&min-price=${minPrice}`,
            maxPrice && `&max-price=${maxPrice}`,
            minRate && `&min-rate=${minRate}`,
            maxRate && `&max-rate=${maxRate}`,
            minCapacity && `&min-capacity=${minCapacity}`,
            maxCapacity && `&max-capacity=${maxCapacity}`,
            checkIn && `&check-in=${checkIn}`,
            checkOut && `&check-out=${checkOut}`,
        ]

        const activeParams = queryParams.join('&')
        console.log(`🚀 ~ length:`, activeParams.length)

        const filters = JSON.stringify(activeParams)
        console.log({ filters })
        // setSearchParams({filters})
    }

    /* Click amenity Carousel List  */
    const onUpdateAmenityBy = (amenityStringParamBy) => {
        console.log(`🚀 ~ stringParam:`, amenityStringParamBy)
        const prevAmenities = searchParams.getAll('amenities')
        console.log(`🚀 ~ onSetonUpdateAmenityBy prev:`, prevAmenities)
        // setSearchParams({ 'filter-by': { 'amenities': JSON.stringify(amenity) } })
    }

    const onUpdateRegionBy = region => dispatch(setFilterBy({ ...filterBy, region }))

    const onUpdateRangeBy = (field, range) => {
        return dispatch(setFilterBy({
            ...filterBy,
            [field]: range
        }))
    }

    const stayFilter = {
        stays,
        getRange,
        filterBy,
        filters: params.filters,
        allAmenities: stayService.get('AMENITIES'),
        allPlaceTypes: stayService.get('PLACE_TYPES'),
        allPropertyTypes: stayService.get('PROPERTY_TYPES'),
        allRegions: stayService.get('REGIONS'),
        onUpdateFilter,
        onUpdateRangeBy,
        onUpdateSortBy,
        onUpdateRegionBy,
    }

    const stayList = {
        stays,
        loggedInUser,
        isLoading,
        onUpdateAmenityBy,
        onClickPreviewImg,
        onUpdateFilter,
        onSetStayAvgRate,
        onRemoveStay,
        onLoadMoreStays,
        onUpdateStay,
        onAddToWishList,
        onRemoveFromWishList,
    }

    return <section className='stay-app'>

        <StayFilter {...stayFilter} />

        <StayList {...stayList} />

        <ScrollTo />
    </section>
}

/* NOTE: save only on front */
const onSetStayAvgRate = (stay) => {
    const reviews = stay?.reviews || []
    const reviewsCount = reviews.length

    const avgRate = reviews.reduce((accRate, review) => accRate + review.rate, 0) / reviewsCount || null

    stay.avgRate = avgRate
    return avgRate
}

/*  Click Preview Image */
const onClickPreviewImg = (idx, id) => {
    console.log(`Click Image!:`, idx, id) // navigate(`/stay/${stay._id}?large-image=${idx}`)
    window.scrollTo(0, 0)
    window.location.href = `/stay/${id}`
}

const onNavHome = () => window.history.pushState(null, null, `/`)

