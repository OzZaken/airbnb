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
import { transService } from '../services/i18n.service'
// import { UNMOUNTED } from 'react-transition-group/Transition'
const { getRange, getAvgRate, getAvgRates, getRangeMap, getAvgPrice, getData, getStat } = stayService
const { formatCurrency } = transService

export const StayApp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const params = useParams()
    const { stays, filterBy, sortBy, isLoading } = useSelector(state => state.stayModule)
    const { loggedInUser } = useSelector(state => state.userModule)
    const [searchParams, setSearchParams] = useSearchParams()

    const stayMap = {
        data: getData(),
        stat: getStat(),
        rangeMap: {}
    }
    
    const stayDataRef = useRef(getData())
    const stayStatRef = useRef(getStat())
    const rangeMapRef = useRef({})
    const totalAvgPriceRef = useRef(0)

    /* store an object data contains [{stayId:stayUpdate}, ] */
    const staysToDispatchRef = useRef([])

    useEffect(() => {
        // handleQueryParams()
        dispatch(loadStays())
        return () => { console.log(`🚀 ~ staysToDispatchRef:`, staysToDispatchRef) }
    }, [])

    /* each stays update, update current ranges. */
    useEffectUpdate(() => {
        getAvgRates(stays) // NOTE: front only
        rangeMapRef.current = getRangeMap(stays)
        totalAvgPriceRef.current = getAvgPrice(stays)
        console.log(`🚀 ~ avgPriceRef.current:`, totalAvgPriceRef.current)
    }, [stays])

    useViewEffect('home-page')

    /* CRUD  */
    const onAddStay = stay => dispatch(addStay(stay))

    const onRemoveStay = stayId => dispatch(removeStay(stayId))

    const onUpdateStay = stay => dispatch(updateStay(stay))

    /* Wishlist */
    const onAddToWishlist = stayId => dispatch(addToWishList(stayId))

    const onRemoveFromWishlist = stayId => dispatch(removeFromWishList(stayId))

    /* Pagination  */
    const onLoadMoreStays = () => dispatch(incPageIdx())

    const onSetPageIdx = idx => dispatch(setPageIdx(idx))

    /* Navigation ~ location.href = `/` */
    const onNavHome = () => {
        scrollTo({ top: 160, behavior: 'smooth' })
        history.pushState(null, null, `/`)
    }

    const onNavStayDetails = (idx, id) => {
        console.log(`onNavStayDetails:`, idx, id)
        scrollTo(0, 0)
        navigate(`/stay/${id}?large-image=${idx}`)
    }

    /* Query Params  */
    const handleQueryParams = () => {
        const [filterByParam, sortByParam] = getQueryParams()
        if (filterByParam || sortByParam) {

            if (filterByParam) dispatch(loadStays(filterByParam))

            else {
                const [field, isDesc] = Object.entries(sortByParam)

                // if not same field
                if (!sortBy[field]) {
                    console.log(`🚀 ~ !sortBy[field:`, !sortBy[field])
                }

                // if not same field return -1
                if (isDesc * sortBy[field] === 1) {
                    console.log(`🚀 ~ (isDesc * sortBy[field] === 1):`, (isDesc * sortBy[field] === 1))
                }

                else {//debug
                    console.log('(isDesc * sortBy[field] !== 1)')
                }
            }
        }
    }

    const getQueryParams = () => {
        const filterStrParam = _.get(searchParams, 'filter-by')
        const sortStrParam = _.get(searchParams, 'sort-by')

        // parse the value or return null
        const filterByPara = filterStrParam ? JSON.parse(filterStrParam) : null
        const sortByParam = sortStrParam ? JSON.parse(sortStrParam) : null

        return [filterByPara, sortByParam]
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
            pageIdx && `&page=${pageIdx}`,

            txt && `&text=${txt}`,

            region && `&region=${region}`,
            label && `&label=${label}`,

            amenities && amenities.join('&'),
            placeTypes && placeTypes.join('&'),
            propertyTypes && propertyTypes.join('&'),

            checkIn && `&check-in=${checkIn}`,
            checkOut && `&check-out=${checkOut}`,

            minPrice && `&min-price=${minPrice}`,
            maxPrice && `&max-price=${maxPrice}`,

            minRate && `&min-rate=${minRate}`,
            maxRate && `&max-rate=${maxRate}`,

            minCapacity && `&min-capacity=${minCapacity}`,
            maxCapacity && `&max-capacity=${maxCapacity}`,

            minBathroom && `&min-bathrooms=${minBathroom}`,
            maxBathroom && `&max-bathrooms=${maxBathroom}`,

            minBedroom && `&min-bedrooms=${minBedroom}`,
            maxBedroom && `&max-bedrooms=${maxBedroom}`,

            // minBed && `&min-Beds=${minBed}`, 
            // maxBed && `&max-Beds=${maxBed}`,
        ]

        const queryStringParam = queryParams.join('')
        console.log(`🚀 ~ queryStringParam:`, queryStringParam)

        const filterStrParam = JSON.stringify(queryStringParam)
        console.log(`🚀 ~ filterStrParam:`, filterStrParam)
        // setSearchParams('filter-by',filterStrParam)
        // setSearchParams({filterStrParam})
    }

    /* Sort */
    const onUpdateSortBy = sortBy => dispatch(setSortBy(sortBy))

    /* Filter */
    const onUpdateFilterBy = filterBy => dispatch(setFilterBy({ ...filterBy, filterBy }))

    const onUpdateFilterByField = (field, val) => dispatch(setFilterBy({ ...filterBy, [field]: val }))

    /* NOTE: save only in Front */
    const onSetStayAvgRate = (stay) => {
        const avgRate = getAvgRate(stay)
    }

    /* object literal */
    const stayFilter = {
        dataRef: stayDataRef,
        stays,
        filterBy, sortBy,
        onUpdateFilterBy, onUpdateSortBy,
        onUpdateFilterByField,
        getRange,
    }

    const stayList = {
        stays,
        isLoading,
        loggedInUser,
        staysToDispatchRef,
        onClickPreviewImg: onNavStayDetails,
        onSetStayAvgRate, // 01.when preview first load // todo: 02.when emit from socket ADD_REVIEW 
        onRemoveStay, onUpdateStay,
        onAddToWishlist, onRemoveFromWishlist,
        onLoadMoreStays,
    }

    return <section className='stay-app'>
        <StayFilter {...stayFilter} />

        <StayList {...stayList} />

        <ScrollTo />
    </section>
}