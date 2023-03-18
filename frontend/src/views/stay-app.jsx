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
import { Box, CircularProgress, Skeleton } from '@mui/material'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { useDebug } from '../hooks/useDebug'
import IconApp from '../cmps/app-icon'
import { stayService } from '../services/stay.service'
// import { UNMOUNTED } from 'react-transition-group/Transition'
import ScrollTo from '../cmps/scroll-to'

export const StayApp = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const { stays, filterBy } = useSelector(state => state.stayModule)
    const { loggedInUser } = useSelector(state => state.userModule)

    useEffect(() => {
        dispatch(loadStays())
        // dispatch(loadAmenities())

        /* queryParams*/
        if (searchParams.has('filters')) {
            const queryFilter = JSON.parse(searchParams.get('filters'))
            if (queryFilter !== filterBy) {
                console.log('UT queryFilter !== filterBy')
                console.log('queryFilter', JSON.parse(queryFilter))
                console.log('filterBy', filterBy)
                // dispatch(setFilterBy(queryFilter))
            }
        }

    }, [])

    useViewEffect('home-page')

    useEffectUpdate(() => {
        const fields = ['price', 'capacity']
        const rangeBy = {}
        for (let i = 0; i < fields.length; i++) {
            rangeBy[`${fields[i]}Range`] = _getRange(fields[i])
        }
        dispatch(setFilterBy({ ...filterBy, ...rangeBy }))
    }, [stays])

    const _getRange = (field) => {
        return stays.reduce((accRange, stay) => [
            Math.min(accRange[0], stay[field]),
            Math.max(accRange[1], stay[field])
        ], [Infinity, -Infinity])
    }

    /* NOTE: save only on front */
    const onSetAvgRate = (stay) => {
        const reviews = stay?.reviews || []
        const reviewsCount = reviews.length

        const avgRate = reviews.reduce((accRate, review) => accRate + review.rate, 0) / reviewsCount || 0

        stay.avgRate = avgRate
        return avgRate
    }

    /*  Filter  */
    const onChangeFilter = filterBy => {
        const { txt, placeType, amenities, priceRange, rateRange, capacityRange, dateRange } = filterBy

        const [minPrice, maxPrice] = priceRange
        const [minRate, maxRate] = rateRange
        const [minCapacity, maxCapacity] = capacityRange
        const [checkIn, checkOut] = dateRange

        const queryParams = [
            txt && `&text=${txt}`,
            placeType && `&place-type=${placeType}`,
            amenities && amenities.join('&'),
            minPrice && `&min-price=${minPrice}`, maxPrice && `&max-price=${maxPrice}`,
            minRate && `&min-rate=${minRate}`, maxRate && `&max-rate=${maxRate}`,
            minCapacity && `&min-capacity=${minCapacity}`, maxCapacity && `&max-capacity=${maxCapacity}`,
            checkIn && `&check-in=${checkIn}`, checkOut && `&check-out=${checkOut}`,
        ]

        const activeParams = queryParams.join('&')
        
        const filters = JSON.stringify(activeParams)

        // setSearchParams({filters})
    }

    const onChangeRange = (field, range) => dispatch(setFilterBy({ ...filterBy, [field]: range }))

    /* amenities  */
    const amenities = stayService.getAmenities()

    const onSetFilterByAmenity = (stringParam) => {
        console.log(`🚀 ~ onSetFilterByAmenity:`, stringParam)
        const prevAmenities = searchParams.getAll('amenities')
        console.log(`🚀 ~ onSetFilterByAmenity:`, prevAmenities)
        // setSearchParams({ 'filter-by': { 'amenities': JSON.stringify(amenity) } })
    }

    const onChangeSort = sortBy => dispatch(setSortBy(sortBy))
    const onChangeDestination = destination => dispatch(setSortBy(destination))
    
    /*  Click Preview Image */
    const navigate = useNavigate()
    const onClickPreviewImg = (idx, id) => {
        console.log(`Click Image!:`, idx,) // navigate(`/stay/${stay._id}?large-image=${idx}`)
        window.scrollTo(0, 0)
        navigate(`/stay/${id}}`)
    }

    /* WISHLIST */
    const onAddToWishList = stayId => dispatch(addToWishList(stayId))

    const onRemoveFromWishList = stayId => dispatch(removeFromWishList(stayId))

    /* STAY  */
    const onRemoveStay = stayId => dispatch(removeStay(stayId))

    const onUpdateStay = stay => dispatch(updateStay(stay))

    const onLoadMoreStays = () => dispatch({ type: 'INC_PAGE_IDX' })

    return !stays ? (
        <Box sx={{ display: 'flex', margin: '30px auto' }}>
            <Skeleton variant="rectangular" width={300} height={300} />
        </Box>
    ) : <section className='stay-app'>

        <StayFilter filterBy={filterBy} allAmenities={amenities}
            onChangeSort={onChangeSort}
            onChangeDestination={onChangeDestination}
            onChangeFilter={onChangeFilter}
            onSetFilterByAmenity={onSetFilterByAmenity}
        />

        <StayList stays={stays} loggedInUser={loggedInUser}
            onSetAvgRate={onSetAvgRate}
            onAddToWishList={onAddToWishList}
            onRemoveStay={onRemoveStay}
            onRemoveFromWishList={onRemoveFromWishList}
            onClickPreviewImg={onClickPreviewImg}
            onUpdateStay={onUpdateStay}
        />
    <ScrollTo/> 
    </section>
}