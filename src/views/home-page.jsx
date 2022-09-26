import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AppIcon from '../cmps/app-icon'
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

    // * FilterBy

    const getStayFilterBy = () => {
        const filterToShow = stayService.getFilterBys()
        console.log('filterToShow:', filterToShow)
        const elFilterBys = []

        for (const filterBy in filterToShow) {
            console.log('filterToShow[filterBy]:', filterToShow[filterBy])
            console.log('key:', filterToShow[filterBy])
            console.log('value:', filterToShow[filterBy].value)


        // elFilterBys.push(<div key={filterToShow[filterBy]}>
        // <AppIcon iconKey={filterToShow[filterBy]} />
        // </div>
        // )
        }
       


        return elFilterBys
    }

    const onFilterBy = (iconKey) => {
        stayService.query(iconKey)
    }

    if (!stays) return <h1>Loading...</h1> // Todo: Some Skeletons
    return <section className='home-page' >
        <div className="flex filter-bar">
            {getStayFilterBy()}
        </div>
        <StayList stays={stays} getStayAvgRate={getStayAvgRate} />
    </section>
}