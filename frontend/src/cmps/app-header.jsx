import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import AppIcon from "./app-icon"
import { StayFilter } from "./stay/stay-filter"
import { UserMenu } from "./user-menu"

import { setFilterBy, loadStays } from '../store/stay.action'//stayLoading

function _AppHeader({ view }) {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    useEffectUpdate(() => { }, [view])

    const onSetFilterBy = (filterBy) => {
        dispatch(setFilterBy(filterBy))
    }

    const onSetSearchBy = (searchBy) => {
        console.log('searchBy:', searchBy);
        // dispatch(onSetSearchBy(searchBy))
    }

    const btnsRefContainerProps = {
        className: 'full container btns-filter-search',
        onClick: () => {
            console.log('open filter')
        }
    }
    const onShareStay = (stay) => {
        console.log('share this stay:', stay)
    }
    // onClick={() => { window.history.pushState(null, null, `/`) }}

    return <header className='full main-header'>

        {view === 'home' && <section className="full home-header-nav">
            <Link to={''} className="logo"></Link>

            <section className="container btns-filter-search">
                <button onClick={onSetSearchBy} className="btn-circle">
                    <AppIcon iconKey="Search" />
                </button>

                <div className="container btns-ref-container">
                    <span role="button">Anywhere</span><br />
                    <span>Any week 	&#183; Add guests</span>
                </div>

                <button className="btn-circle">
                    <AppIcon iconKey="FilterBy" />
                </button>
            </section>

            <UserMenu />

        </section>}
        {view === 'home' && <StayFilter onChangeFilter={onSetFilterBy} />}

        {view === 'stay-details' && <section className="stay-details-header">
            <div className="flex space-between">
                <Link to={''}>
                    <div className="nav-back">Homes</div>
                </Link>

                <div className="actions-btns">
                    <button onClick={onShareStay} className="btn-share">
                        <AppIcon iconKey='Share' />
                    </button>

                    <button className="btn-favorite">
                        <AppIcon iconKey='Favorite' />
                    </button>
                </div>
            </div>
        </section>}
    </header>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const AppHeader = connect(mapStateToProps,)(_AppHeader)