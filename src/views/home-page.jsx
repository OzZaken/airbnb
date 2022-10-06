import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Services
import { stayService } from '../services/stay.service.local'
import { loadStays, removeStay, setFilterBy, sortByStays } from '../store/stay.action'
// CMPS
import { StayList } from '../cmps/stay/stay-list'

export const HomePage = (getStayAvgRate) => {
    const stays = useSelector((state) => state.stayModule.stays)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadStays())
        // For Unset display none of the filter list
        document.body.classList.add("home-page")
        return () => {
            document.body.classList.remove("home-page")
        }
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

    const onFilterBy = (filterBy) => {
        stayService.query(filterBy)
    }

    if (!stays) return <h1>Loading...</h1> // Todo: Some Skeletons
    return <section className='home-page' >
        <StayList stays={stays} getStayAvgRate={getStayAvgRate} />
    </section>
}