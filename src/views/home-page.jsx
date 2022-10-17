import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Services
import { stayService } from '../services/stay.service.local'
import { loadStays, removeStay, setFilterBy, sortByStays } from '../store/stay.action'
//todo: import loc service
// CMPS
import { StayList } from '../cmps/stay/stay-list'
import { StayFilter } from '../cmps/stay/stay-filter'

export const HomePage = () => {
    const stays = useSelector(state => state.stayModule.stays)
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStays())
        sessionStorage.setItem("userLoc", `${sessionStorage.getItem("userLoc") || getUserPos()}`)
        console.log('filterBy:', filterBy)
        document.body.classList.add("home-page")
        return () => {
            document.body.classList.remove("home-page")
        }
    }, [filterBy])

    // TODO: User Location cookie with timeout or session storage?
    const getUserPos = () => {
        getPosition()
            .then(pos => {
                const { latitude, longitude } = pos.coords
                console.log(`Latitude: ${latitude} - Longitude: ${longitude}`)
            })
            .catch(err => {
                console.log('err!!!', err)
            })
    }
    function getPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }

    const onFilterBy = (filterBy) => stayService.query(filterBy)
    const onSetFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadStays())
    }

    const onChangeSort = (sortBy) => {
        dispatch(sortByStays(sortBy))
    }

    const onRemoveStay = (stayId) => {
        dispatch(removeStay(stayId))
    }
    if (!stays) return <h1>Loading...</h1> // Todo: Some Skeletons
    return <section className='full home-page' >
        <StayFilter filterBy={filterBy}/>
        <StayList stays={stays} />
    </section>
}