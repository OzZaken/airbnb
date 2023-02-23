import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { iconService } from "../services/svg.service"
import { setFilterBy, loadStays } from '../store/actions/stay.action'//stayLoading
import { StayFilter } from "./stay/stay-filter"
import { UserMenu } from "./user-menu"

function _AppHeader({ view }) {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    useEffect(() => {
        const position = view === 'home' ? 'fixed' : 'static'
        // console.log(`🚀 ~ position:`, position)
        window.addEventListener('resize', onSetInnerWidth)
        return () => window.removeEventListener('resize', onSetInnerWidth)
    }, [])

    const onSetInnerWidth = () => {
        setInnerWidth(window.innerWidth)
    }
    useEffectUpdate(() => {
        console.log('currentView:', view)
    }, [view])

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
    }

    return (
        <header className='main-header full'>
            {innerWidth >= 740 && <div className="container logo-container">
                <div className="logo" onClick={() => { window.history.pushState(null, null, `/`) }}>{iconService.Logo()}</div>
                <UserMenu />
            </div>}

            {view === 'home' && <section className="home-header">

                {innerWidth <= 740 && <div className="container anywhere">
                    <button className="search-by">{iconService.Search()}</button>
                    <div role="button" className="btns-container">
                        <p>Anywhere<br />
                            <span>Any week	&#183; Add guests</span>
                        </p>
                    </div>
                    <button className="filter-by">{iconService.FilterBy()}</button>
                </div>}

                <StayFilter onChangeFilter={onChangeFilter} />
            </section>}

            {view === 'details' && <section className="stay-details-header">

            </section>}
        </header>
    )
}

function mapStateToProps(state) {
    const { view } = state.appModule
    // const { isLoading } = state.stayModule
    return {
        view,
        // isLoading
    }
}

export const AppHeader = connect(mapStateToProps,)(_AppHeader)