import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StayFilter } from '../cmps/stay-filter'
import { StayList } from '../cmps/stay-list'
import { ViewPortHelper } from '../cmps/ViewPortHelper'
import { loadStays, removeStay, setFilterBy, sortByStays } from '../store/stay.action'

export const App = () => {
    const stays = useSelector((state) => state.stayModule.stays)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStays())
    }, [])

    const onRemoveStay = (stayId) => {
        dispatch(removeStay(stayId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadStays())
    }

    const onChangeSort = (sortBy) => {
        dispatch(sortByStays(sortBy))
    }

    if (!stays) return <h1>Loading...</h1>
    return (
        <section className="stay-app">
            <div className="viewport"></div>
            {/* <ViewPortHelper/> */}
            {/* <StayFilter onChangeFilter={onChangeFilter} /> */}
            <StayList onRemoveStay={onRemoveStay} stays={stays} />
        </section>
    )
}

