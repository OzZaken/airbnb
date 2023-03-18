import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
/* hooks */
import { useEffectUpdate } from "../hooks/useEffectUpdate"
/* actions */
import { setFilterBy, loadStays } from '../store/stay.action'
/* cmps */
import IconApp from "./app-icon"
import AccountMenu from "./user/user-menu"
// import { LoginSignup } from "./system/login-signup"
/* services *//* UI UX */

function _AppHeader({ view }) {
    const dispatch = useDispatch()

    // useEffectUpdate(() => { }, [view])
    useEffect(() => { }, [view])
    
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
                    <IconApp iconKey="Search" />
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
                    <IconApp iconKey="FilterBy" />
                </button>
            </section>

            <AccountMenu />
        </section>

        {view === 'stay-details' && <section className="stay-details-header">
            <Link className="link-homes" to={''}>&lt; Homes</Link>

            <div className="btns-container">
                <button onClick={onShareStay} className="btn-share">
                    <IconApp iconKey='Share' />
                </button>

                <button className="btn-favorite">
                    <IconApp iconKey='Favorite' />
                </button>
            </div>
        </section>}
    </header>
}

function mapStateToProps(state) {
    const { view } = state.systemModule
    return { view }
}

export const AppHeader = connect(mapStateToProps,)(_AppHeader)