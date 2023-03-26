import { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { addStay, loadStays, removeStay, setSortBy, updateStay, setFilterBy, removeFromWishList, addToWishList, incPageIdx } from '../store/stay.action'
import { useViewEffect } from '../hooks/useViewEffect'
import { StayList } from '../cmps/stay/stay-list'
import { StayFilter } from "../cmps/stay/stay-filter"
import ScrollTo from '../cmps/scroll-to'
// import { UNMOUNTED } from 'react-transition-group/Transition'

const { getData, getRange, setRate } = stayService

const data = getData()

const stayData = {
    allAmenities: data.AMENITIES,
    allLabels: data.LABELS,
    allPlaceTypes: data.PLACE_TYPES,
    allPropertyTypes: data.PROPERTY_TYPES,
    allRegions: data.REGIONS,
}

export const StayApp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { stays, filterBy, sortBy, isLoading } = useSelector(state => state.stayModule)
    const { loggedInUser } = useSelector(state => state.userModule)

    const [searchParams, setSearchParams] = useSearchParams()

    const [isSticky, setIsSticky] = useState(false)
    const filterRef = useRef(null)

    useEffect(() => {
        dispatch(loadStays())

        /* queryParams*/
        if (searchParams.has('filter-by')) {
            const queryFilter = JSON.parse(searchParams.get('filters'))
            if (queryFilter !== filterBy) {
                console.log('UT queryFilter !== filterBy')
                // dispatch(setFilterBy(queryFilter))
            }
        }

        document.addEventListener('scroll', onSetIsSticky, true)
        return () => document.removeEventListener('scroll', onSetIsSticky, true)
    }, [])

    useEffect(() => {
        const elFilter = filterRef.current
        // if (isSticky) filterRef.current.classList.add('sticky')
        // else filterRef.current.classList.remove('sticky')

        if (elFilter) {
            elFilter.style.position = isSticky ? 'sticky' : 'static'
            elFilter.style.top = isSticky ? '80' : 'auto'
        }
    }, [isSticky])

    useViewEffect('home-page')

    const onSetIsSticky = () => {
        const posY = window.scrollY
        if (posY > 20) {
            if (!isSticky) setIsSticky(true)
        } else setIsSticky(false)
    }

    /* CRUD  */
    const onAddStay = stay => dispatch(addStay(stay))

    const onRemoveStay = stayId => dispatch(removeStay(stayId))

    const onUpdateStay = stay => dispatch(updateStay(stay))

    /* Wishlist */
    const onAddToWishlist = stayId => dispatch(addToWishList(stayId))

    const onRemoveFromWishlist = (stayId) => dispatch(removeFromWishList(stayId))

    /* Pagination  */
    const onLoadMoreStays = () => dispatch(incPageIdx())

    /* Navigation  */
    const getQueryParams = () => {
        const filterByParam = _.get(searchParams, 'filter-by')
        const sortByParam = _.get(searchParams, 'sort-by')

        const queryParams = {
            filterBy: filterByParam ? JSON.parse(filterByParam) : null,
            sortBy: sortByParam ? JSON.parse(sortByParam) : null
        }

        return queryParams
    }

    const onNavHome = () => {
        scrollTo({ top: 160, behavior: 'smooth' })
        // window.location.href = `/`
        history.pushState(null, null, `/`)
    }

    const onNavStayDetails = (idx, id) => {
        console.log(`onNavStayDetails:`, idx, id)
        scrollTo(0, 0)
        navigate(`/stay/${id}?large-image=${idx}`)
    }

    /* Sort */
    const onUpdateSortBy = sortBy => dispatch(setSortBy(sortBy))

    /* Filter */
    const onUpdateFilterBy = filterBy => dispatch(setFilterBy({ ...filterBy, filterBy }))

    const onUpdateFilterByQueryParams = currFilterBy => {
        const {
            pageIdx,
            txt, region,
            placeTypes, propertyTypes, labels, amenities,
            priceRange, rateRange, capacityRange, dateRange
        } = currFilterBy

        const [minPrice, maxPrice] = priceRange
        const [minRate, maxRate] = rateRange
        const [minCapacity, maxCapacity] = capacityRange
        const [checkIn, checkOut] = dateRange

        const queryParams = [
            pageIdx && `&page=${pageIdx}`,
            txt && `&text=${txt}`, region && `&region=${region}`,
            placeTypes && placeTypes.join('&'), propertyTypes && propertyTypes.join('&'),
            labels && labels.join('&'), amenities && amenities.join('&'),
            minPrice && `&min-price=${minPrice}`, maxPrice && `&max-price=${maxPrice}`,
            minRate && `&min-rate=${minRate}`, maxRate && `&max-rate=${maxRate}`,
            minCapacity && `&min-capacity=${minCapacity}`, maxCapacity && `&max-capacity=${maxCapacity}`,
            checkIn && `&check-in=${checkIn}`, checkOut && `&check-out=${checkOut}`,
        ]

        const queryStringParam = queryParams.join('')
        console.log('queryParams.length', queryParams.length)// todo: put on activeFiltersCountRef

        const filterBy = JSON.stringify(queryStringParam)
        console.log({ filterBy: currFilterBy })
        // setSearchParams({filterBy})
    }

    const onUpdateFilterByField = (field, val) => {
        return dispatch(setFilterBy({
            ...filterBy,
            [field]: val
        }))
    }

    /* NOTE: save only in Front */
    const onSetStayAvgRate = (stay) => {
        const rate = setRate(stay)
        console.log(`🚀 ~ rate:`, rate)
    }

    /* object literal */
    const stayFilter = {
        stays,
        ref: filterRef.current,
        filterBy, sortBy,
        getQueryParams,
        onUpdateFilterBy, onUpdateSortBy,
        onUpdateFilterByField,
        getRange,
    }

    const stayList = {
        stays,
        isLoading,
        loggedInUser,
        onClickPreviewImg: onNavStayDetails,
        onSetStayAvgRate,
        onRemoveStay, onUpdateStay,
        onAddToWishlist, onRemoveFromWishlist,
        onLoadMoreStays,
    }

    // Debug:
    window.debugNavHome = () => { onNavHome() }
    window.debugIncPageIdx = () => { onLoadMoreStays() }
    window.debugSetStayAvgRate = () => { console.log(`onLoadMoreStays:`, onLoadMoreStays(stays[0])) }

    return <section className='stay-app'>

        <StayFilter {...stayData} {...stayFilter} />

        <StayList {...stayList} />

        {/* <ScrollTo /> */}
    </section>
}