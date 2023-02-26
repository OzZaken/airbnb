import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { iconService } from "../services/svg.service"
import { setFilterBy, loadStays } from '../store/stay.action'//stayLoading
import { StayFilter } from "./stay/stay-filter"
import { UserMenu } from "./user-menu"

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
        console.log('share this stay:',stay)
    }
    // onClick={() => { window.history.pushState(null, null, `/`) }}

    const { Search, FilterBy, ArrowCircleLeft, Share, Favorite } = iconService
    return <header className='full main-header'>

        {view === 'home' && <section className="full home-header-nav">
            <Link to={''} className="logo-container">
                <div className="logo"></div>
            </Link>

            <section className="container btns-filter-search">
                <button onClick={onSetSearchBy} className="btn-circle">{Search()}</button>

                <div className="container btns-ref-container">
                    <span role="button">Anywhere</span><br />
                    <span>Any week 	&#183; Add guests</span>
                </div>

                <button className="btn-circle">{FilterBy()}</button>
            </section>

            <UserMenu />

        </section>}
        {view === 'home' && <StayFilter onChangeFilter={onSetFilterBy} />}

        {view === 'stay-details' && <section className="stay-details-header">
            <div className="flex space-between">
                <Link to={''}>
                    {ArrowCircleLeft()} Homes
                </Link>

                <div className="actions-btns">
                    <button onClick={onShareStay} className="btn-share">
                        {Share()}
                    </button>

                    <button className="btn-favorite">
                        {Favorite()}
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