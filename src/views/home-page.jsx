import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay/stay-list'
import { stayService } from '../services/stay.service.local'
import { loadStays, removeStay, setFilterBy, sortByStays } from '../store/stay.action'

export const HomePage = (getStayAvgRate) => {
    const stays = useSelector((state) => state.stayModule.stays)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadStays())
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

    if (!stays) return <h1>Loading...</h1>
    return <section className='home-page' >
        <div className="flex filter-bar">

        </div>
        <StayList stays={stays} getStayAvgRate={getStayAvgRate} />
    </section>
}