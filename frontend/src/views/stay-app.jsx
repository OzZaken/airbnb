import { useEffect, useReducer, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { addStay, loadStays, removeStay, setSortBy, updateStay, setFilterBy, removeFromWishList, addToWishList, incPageIdx } from '../store/stay.action'
import { useViewEffect } from '../hooks/useViewEffect'
import { StayList } from '../cmps/stay/stay-list'
import { StayFilter } from "../cmps/stay/stay-filter"
import ScrollTo from '../cmps/scroll-to'
// import { UNMOUNTED } from 'react-transition-group/Transition'

const stayData = {
    allAmenities: stayService.get('AMENITIES'),
    allLabels: stayService.get('LABELS'),
    allPlaceTypes: stayService.get('PLACE_TYPES'),
    allPropertyTypes: stayService.get('PROPERTY_TYPES'),
    allRegions: stayService.get('REGIONS'),
}

export const StayApp = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { stays, filterBy, isLoading } = useSelector(state => state.stayModule)
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

    /* CRUD  */
    const onAddStay = stay => dispatch(addStay(stay))

    const onRemoveStay = stayId => dispatch(removeStay(stayId))

    const onUpdateStay = stay => dispatch(updateStay(stay))
    /* Pagination  */
    const onLoadMoreStays = () => dispatch(incPageIdx())

    window.incPageIdx = () => { // debug
        onLoadMoreStays()
    }

    /* Navigation  */
    const onNavHome = () => {
        scrollTo({ top: 160, behavior: 'smooth' })
        window.history.pushState(null, null, `/`)
    }

    const onClickPreviewImg = (idx, id) => {
        console.log(`Click Image!:`, idx, id)
        navigate(`/stay/${id}?large-image=${idx}`)
        window.scrollTo(0, 0)
        // window.location.href = `/stay/${id}`
    }

    /* Wishlist */
    const onAddToWishList = stayId => dispatch(addToWishList(stayId))

    const onRemoveFromWishList = (stayId) => dispatch(removeFromWishList(stayId))

    /* Sort  */
    const onUpdateSortBy = sortBy => dispatch(setSortBy(sortBy))

    /* Filter  */
    const onUpdateFilterBy = filterBy => {
        const { txt, placeTypes, labels, amenities, priceRange, rateRange, capacityRange, dateRange } = filterBy

        const [minPrice, maxPrice] = priceRange
        const [minRate, maxRate] = rateRange
        const [minCapacity, maxCapacity] = capacityRange
        const [checkIn, checkOut] = dateRange

        const queryParams = [
            txt && `&text=${txt}`,
            placeTypes && placeTypes.join('&'),
            labels && labels.join('&'), amenities && amenities.join('&'),
            minPrice && `&min-price=${minPrice}`, maxPrice && `&max-price=${maxPrice}`,
            minRate && `&min-rate=${minRate}`, maxRate && `&max-rate=${maxRate}`,
            minCapacity && `&min-capacity=${minCapacity}`, maxCapacity && `&max-capacity=${maxCapacity}`,
            checkIn && `&check-in=${checkIn}`, checkOut && `&check-out=${checkOut}`,
        ]

        const activeParams = queryParams.join('&')
        console.log(`🚀 ~ length:`, activeParams.length)

        const filters = JSON.stringify(activeParams)
        console.log({ filters })
        // setSearchParams({filters})
    }

    const onUpdateLabelBy = (labelStringParam) => {
        const prevLabel = searchParams.get('label')
        console.log(`🚀 ~ onSetonUpdateAmenityBy prev:`, prevLabel)
        // setSearchParams({ 'filter-by': { 'labels': JSON.stringify(label) } })
    }

    const onUpdateRegionBy = region => dispatch(setFilterBy({ ...filterBy, region }))

    const onUpdateRangeBy = (field, range) => {
        return dispatch(setFilterBy({
            ...filterBy,
            [field]: range
        }))
    }

    const getFiltersParam = () => {
        if (searchParams && searchParams.has('filters')) {
            const filtersParams = JSON.parse(searchParams.get('filters'))
            if (filtersParams) return filtersParams
            else return null
        }
    }

    // handle ranges [min,max]
    const onGetFieldRange = field => stays.reduce((accRange, stay) => [
        Math.min(accRange[0], stay[field]),
        Math.max(accRange[1], stay[field])
    ], [Infinity, -Infinity])

    /* NOTE: save only on front */
    const onSetStayAvgRate = (stay) => {
        console.log(`🚀 ~ stay:`, stay)
        const { reviews } = stay
        if (!reviews || !reviews.length) return

        const reviewsCount = reviews.length

        const avgRate = reviews.reduce((accRate, review) => accRate + review.rate, 0) / reviewsCount || null
        console.log(`🚀 ~ avgRate:`, avgRate)

        stay.avgRate = avgRate
        return avgRate
    }

    // object literal
    const stayFilter = {
        stays,
        filterBy,
        filtersParams: getFiltersParam(),
        onGetFieldRange,
        onUpdateFilterBy,
        onUpdateRangeBy,
        onUpdateSortBy,
        onUpdateRegionBy,
    }

    const stayList = {
        stays,
        loggedInUser,
        isLoading,
        onUpdateAmenityBy: onUpdateLabelBy,
        onClickPreviewImg,
        onUpdateFilter: onUpdateFilterBy,
        onSetStayAvgRate,
        onRemoveStay,
        onUpdateStay,
        onAddToWishList,
        onRemoveFromWishList,
        onLoadMoreStays,
    }

    return <section className='stay-app'>

        <StayFilter {...stayData} {...stayFilter} />

        <StayList {...stayList} />

        <ScrollTo />
    </section>
}