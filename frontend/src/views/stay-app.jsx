import { useEffect, useReducer, useRef, forwardRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { addStay, loadStays, removeStay, setSortBy, updateStay, setFilterBy, removeFromWishList, addToWishList, incPageIdx, setPageIdx } from '../store/stay.action'
import { useViewEffect } from '../hooks/useViewEffect'
import { StayList } from '../cmps/stay/stay-list'
import { StayFilter } from "../cmps/stay/stay-filter"
import ScrollTo from '../cmps/scroll-to'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
// import { UNMOUNTED } from 'react-transition-group/Transition'

const { getData, getRange, setRate, setRates } = stayService

const DATA = getData()

const stayData = {
    allAmenities: DATA.AMENITIES,
    allLabels: DATA.LABELS,
    allPlaceTypes: DATA.PLACE_TYPES,
    allPropertyTypes: DATA.PROPERTY_TYPES,
    allRegions: DATA.REGIONS,
}

export const StayApp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { stays, filterBy, sortBy, isLoading } = useSelector(state => state.stayModule)
    const { loggedInUser } = useSelector(state => state.userModule)

    const [searchParams, setSearchParams] = useSearchParams()

    /* sticky filter using observer  */
    const targetRef = useRef(null)// attach to the element to make sticky.

    // Wrap the StayFilter with forwardRef and add the ref parameter to the props:
    const StayFilterRef = forwardRef((props, ref) => (
        <StayFilter {...props} forwardedRef={ref} />
    ))

    useEffect(() => {
        dispatch(loadStays())
        /* queryParams*/

        const queryParams = getQueryParams()
        if (queryParams) {
            const { filterBy: queryFilterBy, sortBy: querySortBy } = queryParams

            if (queryFilterBy !== filterBy) {
                console.log(`🚀 ~ queryParams.filterBy!== filterBy:`, queryParams.filterBy !== filterBy)
            }
            if (querySortBy !== sortBy) {
                console.log(`🚀 ~ queryParams.sortBy!== sortBy:`, queryParams.sortBy !== sortBy)
            }
            console.log('QueryParams !=== filterBy')
        }

        /* sticky Filter */
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                targetRef.current.classList.add('sticky')
                console.log('sticky ADDED')
            }
            else {
                targetRef.current.classList.remove('sticky')
                console.log('sticky REMOVED')
            }
        }, { threshold: 0 })

        if (targetRef.current) observer.observe(targetRef.current)

        return () => {
            observer.unobserve(targetRef.current)
        }

    }, [])

    /* each stays update, update current localFilter ranges. */
    useEffectUpdate(() => {
        const fields = ['price', 'capacity', 'bathrooms', 'bedrooms']
        const rangeMap = {}
        for (let i = 0; i < fields.length; i++) {
            rangeMap[fields[i]] = getRange(stays, fields[i])
        }
        setRates(stays)
        console.log(`🚀 ~ rangeBy:`, rangeMap)
    }, [stays])

    /* VIEW EFFECT  */
    useViewEffect('home-page')

    /* CRUD  */
    const onAddStay = stay => dispatch(addStay(stay))

    const onRemoveStay = stayId => dispatch(removeStay(stayId))

    const onUpdateStay = stay => dispatch(updateStay(stay))

    /* Wishlist */
    const onAddToWishlist = stayId => dispatch(addToWishList(stayId))

    const onRemoveFromWishlist = (stayId) => dispatch(removeFromWishList(stayId))

    /* Pagination  */
    const onLoadMoreStays = () => dispatch(incPageIdx())

    const onSetPageIdx = (idx) => dispatch(setPageIdx(idx))

    /* Navigation  */
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

    /* Query Params  */
    const getQueryParams = () => {
        const filterByParam = _.get(searchParams, 'filter-by')
        const sortByParam = _.get(searchParams, 'sort-by')

        const queryParams = {
            filterBy: filterByParam ? JSON.parse(filterByParam) : null,
            sortBy: sortByParam ? JSON.parse(sortByParam) : null
        }

        if (!queryParams.filterBy) delete queryParams.filterBy
        if (!queryParams.sortBy) delete queryParams.sortBy
        if (!queryParams.filterBy && !queryParams.sortBy) return null
        return queryParams
    }
    
    const onUpdateFilterByQueryParams = () => {
        const {
            pageIdx,
            txt,
            region, label,
            placeTypes, propertyTypes, amenities,
            prices, rates, capacities, dates
        } = filterBy

        const [minPrice, maxPrice] = prices
        const [minRate, maxRate] = rates
        const [minCapacity, maxCapacity] = capacities
        const [checkIn, checkOut] = dates
        const [minBathroom, maxBathroom] = bathrooms
        const [minBedroom, maxBedroom] = bedrooms

        const queryParams = [
            txt && `&text=${txt}`,
            pageIdx && `&page=${pageIdx}`,

            region && `&region=${region}`,
            label && `&label=${label}`,

            placeTypes && placeTypes.join('&'),
            propertyTypes && propertyTypes.join('&'),
            amenities && amenities.join('&'),

            checkIn && `&check-in=${checkIn}`,
            checkOut && `&check-out=${checkOut}`,

            minPrice && `&min-price=${minPrice}`,
            maxPrice && `&max-price=${maxPrice}`,

            minRate && `&min-rate=${minRate}`,
            maxRate && `&max-rate=${maxRate}`,

            minCapacity && `&min-capacity=${minCapacity}`,
            maxCapacity && `&max-capacity=${maxCapacity}`,
            // minBeds && `&min-beds=${minBed}`, maxRate && `&max-beds=${maxBed}`,

            minBathroom && `&min-bathrooms=${minBathroom}`,
            maxBathroom && `&max-bathrooms=${maxBathroom}`,

            minBedroom && `&min-bedrooms=${minBedroom}`,
            maxBedroom && `&max-bedrooms=${maxBedroom}`,
        ]

        const queryStringParam = queryParams.join('')
        console.log('queryParams.length', queryParams.length)// todo: put on activeFiltersCountRef

        const filterBy = JSON.stringify(queryStringParam)
        console.log({ filterBy: currFilterBy })
        // setSearchParams({filterBy})
    }

    /* Sort */
    const onUpdateSortBy = sortBy => dispatch(setSortBy(sortBy))

    /* Filter */
    const onUpdateFilterBy = filterBy => dispatch(setFilterBy({ ...filterBy, filterBy }))

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
        ...stayData,
        stays,
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
        onSetStayAvgRate,// when emit from socket ADD_REVIEW
        onRemoveStay, onUpdateStay,
        onAddToWishlist, onRemoveFromWishlist,
        onLoadMoreStays,
    }

    return <section className='stay-app'>
        {/* <StayFilter ref={targetRef} {...stayFilter} /> */}
        <StayFilterRef ref={targetRef} {...stayFilter} />

        <StayList {...stayList} />

        <ScrollTo />
    </section>
}