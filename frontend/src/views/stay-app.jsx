import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/* services */
import { utilService } from '../services/util.service'
import { translationService } from '../services/i18n.service'
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

export const StayApp = () => {
    useDebug( 'StayApp', StayApp )
    const dispatch = useDispatch()
    const { stays, filterBy } = useSelector(state => state.stayModule)
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        /* debug*/
        console.count('cdm StayApp')
        console.log(`%c filterBy:${JSON.stringify(filterBy, null, 2)}`, 'color: blue;')

        /* init*/
        dispatch(loadStays())
        translationService.doTrans()

        /* Extract filter from searchParams*/
        if (searchParams.has('filter-by')) {
            const filterBy = JSON.parse(searchParams.get('filter-by'))
            console.log('searchParams.has(filter-by:)', filterBy)
            dispatch(setFilterBy(filterBy))
        }

        /* UX UI*/
        dispatch(updateView('home'))
        document.body.classList.add('home-page')
        return () => {
            document.body.classList.remove('home-page')
        }
    }, [])

    useEffectUpdate(() => {
        console.count('filterByChanged')
        dispatch(loadStays())
    }, [filterBy])

    /* NOTE: not save it to the back */
    const setAvgRate = (stay) => {
        const reviews = stay?.reviews || []
        const reviewsCount = reviews.length
        const avgRate = reviews.reduce((accRate, review) => accRate + review.rate, 0) / reviewsCount || 0
        stay.avgRate = avgRate
        return avgRate
    }

    const getRange = (range) => {
        return stays.reduce((accRange, stay) => [
            Math.min(accRange[0], stay[range]),
            Math.max(accRange[1], stay[range])
        ], [Infinity, -Infinity])// [Min, Max]
    }

    const onChangeFilter = (filterBy) => {
        console.log(`🚀 ~ onChangeFilter:`, filterBy)
        const { txt, placeType, amenities, minPrice, maxPrice, minRate, maxRate, minCapacity, } = filterBy

        setSearchParams({
            filterBy: {
                'text': txt || '', 'place-type': placeType || '',
                'amenities': amenities.join('&') || '',

                'min-price': minPrice, 'max-price': maxPrice,
                'min-rate': minRate, 'max-rate': maxRate,
                'min-capacity': minCapacity,
            }
        })
        // opt ~ setSearchParams({ 'filter-by': JSON.stringify(filterBy) })
    }
    const onSetFilterByAmenity = (amenityStringParam) => {
        console.log(`🚀 ~ amenity:`, amenityStringParam)
        const prevAmenities = searchParams.getAll('amenities')
        console.log(`🚀 ~ prevFilter:`, prevAmenities)
        // setSearchParams({ 'filter-by': { 'amenities': JSON.stringify(amenity) } })
    }

    // Todo:
    const onChangeSort = (sortBy) => { dispatch(setSortBy(sortBy)) }
    const onRemoveStay = (stayId) => { dispatch(removeStay(stayId)) }
    const onUpdateStay = (stay) => { dispatch(updateStay(stay)) }

    if (!stays) return (
        <Box sx={{ display: 'flex', margin: '100px auto' }}>
            <CircularProgress />
        </Box>
    )

    // console.log(getRange(stays, 'rate'))
    return <section className='home-page'>
        <StayFilter filterBy={filterBy}
            getRange={getRange}
            onChangeFilter={onChangeFilter}
            onSetFilterByAmenity={onSetFilterByAmenity}
        />

        <StayList stays={stays}
            getStayAvgRate={setAvgRate}
            onChangeSortBy={onChangeSort}
            onUpdateStay={onUpdateStay}
            onRemoveStay={onRemoveStay}
        />
    </section>
}