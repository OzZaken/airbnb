import { useEffect, useReducer } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/* services */
import { utilService } from '../services/util.service'
import { translationService } from '../services/i18n.service'
/* hooks */
import { useViewEffect } from '../hooks/useViewEffect'
/* actions */
import { loadStays, removeStay, setSortBy, updateStay, setFilterBy } from '../store/stay.action'
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
    /* debug*/
    // useDebug('StayApp', props)
    const dispatch = useDispatch()

    // const [state,dispatch] = useReducer(rootReducer)
    const { stays, filterBy } = useSelector(state => state.stayModule)
    const [searchParams, setSearchParams] = useSearchParams()

    useViewEffect('home-page')
    useEffect(() => {
        dispatch(loadStays())
        translationService.doTrans()

        /* Extract filter from searchParams*/
        if (searchParams.has('filter-by')) {
            const filterBy = JSON.parse(searchParams.get('filter-by'))
            console.log('searchParams.has(filter-by:)', filterBy)
            dispatch(setFilterBy(filterBy))
        }
    }, [])

    useEffect(() => {
        console.count('filterByChanged', filterBy)
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

    /* range reduce */
    const getRange = (field) => {
        return stays.reduce((accRange, stay) => [
            Math.min(accRange[0], stay[field]),
            Math.max(accRange[1], stay[field])
        ], [Infinity, -Infinity])// [Min, Max]
    }

    const onChangeRange = (field, range) => dispatch(setFilterBy({ ...filterBy, [field]: range }))

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

    /*  click stay image */
    const navigate = useNavigate()
    const onClickPreviewImg = (idx, id) => {
        console.log(`Click Image!:`, idx,) // navigate(`/stay/${stay._id}?large-image=${idx}`)
        window.scrollTo(0, 0)
        navigate(`/stay/${id}}`)
    }

    // Todo:
    // function onSetSortBy() {
    //     const prop = document.querySelector('.sort-by').value
    //     const isDesc = document.querySelector('.sort-desc').checked

    //     const sortBy = {
    //         [prop]: (isDesc) ? -1 : 1
    //     }

    //     setBookSort(sortBy)
    //     renderBooks()
    // }
    /*  click amenity icon */
    const onSetFilterByAmenity = (amenityStringParam) => {
        console.log(`🚀 ~ onSetFilterByAmenity:`, amenityStringParam)
        const prevAmenities = searchParams.getAll('amenities')
        console.log(`🚀 ~ prevFilter:`, prevAmenities)
        // setSearchParams({ 'filter-by': { 'amenities': JSON.stringify(amenity) } })
    }
    // console.log(getRange(stays, 'rate'))
    const onToggleIsInWishlist = stay => { console.log('favorite: add to &isFavorite', stay) }
    const onChangeSort = sortBy => dispatch(setSortBy(sortBy))
    const onRemoveStay = stayId => dispatch(removeStay(stayId))
    const onUpdateStay = stay => dispatch(updateStay(stay))

    /* Loader */
    if (!stays) return (
        <Box sx={{ display: 'flex', margin: '100px auto' }}>
            <CircularProgress />
        </Box>
    )
    // 
    return <section className='stay-app'>
        <StayFilter filterBy={filterBy}
            onChangeFilter={onChangeFilter}
            onSetFilterByAmenity={onSetFilterByAmenity}
        />

        <StayList stays={stays}
            getRange={getRange}
            setAvgRate={setAvgRate}
            onToggleIsInWishlist={onToggleIsInWishlist}
            onClickPreviewImg={onClickPreviewImg}
            onChangeSortBy={onChangeSort}
            onRemoveStay={onRemoveStay}
            onUpdateStay={onUpdateStay}
        />
    </section>
}