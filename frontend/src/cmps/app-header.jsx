import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import AppIcon from "./app-icon"
import { StayFilter } from "./stay/stay-filter"
import { UserMenu } from "./user-menu"
import { setFilterBy, loadStays } from '../store/stay.action'
// import { LoginSignup } from "./login-signup"

function _AppHeader({ view }) {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    useEffectUpdate(() => { }, [view])
    // filter
    const onSetFilterBy = (filterBy) => {
        console.log(`🚀 ~ filterBy:`, filterBy)
        dispatch(setFilterBy(filterBy))
    }

    const onSetSearchBy = (searchBy) => {
        console.log('searchBy:', searchBy);
        // dispatch(onSetSearchBy(searchBy))
    }

    const onShareStay = (stay) => {
        console.log('share this stay:', stay)
    }
    // onClick={() => { window.history.pushState(null, null, `/`) }}

    return <header className='full main-header'>

        <section className="main-header-nav">
            <Link to={''} className="logo"></Link>

            <section className="container main-search-container">
                <button onClick={onSetSearchBy} className="btn-circle btn-search-by">
                    <AppIcon iconKey="Search" />
                </button>

                <div className="container main-btn-ref-container">
                    <span>Anywhere<br /></span>
                    <span>Any week 	&#183; Add guests</span>

                    <div hidden className="btns-ref-container">
                        <button className="container btn-ref" >Anywhere</button>
                        <button className="container btn-ref" >Any week</button>
                        <button className="container btn-ref" >Add guests</button>
                    </div>
                </div>

                <button className="btn-circle btn-filter-by">
                    <AppIcon iconKey="FilterBy" />
                </button>
            </section>

            <UserMenu />
        </section>

        {view === 'home' && <StayFilter onChangeFilter={onSetFilterBy} />}

        {view === 'stay-details' && <section className="stay-details-header">
            <Link className="link-homes" to={''}>&lt; Homes</Link>

            <div className="btns-container">
                <button onClick={onShareStay} className="btn-share">
                    <AppIcon iconKey='Share' />
                </button>

                <button className="btn-favorite">
                    <AppIcon iconKey='Favorite' />
                </button>
            </div>
        </section>}
    </header>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const AppHeader = connect(mapStateToProps,)(_AppHeader)