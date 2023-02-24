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
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    useEffect(() => {
        const position = view === 'home' ? 'fixed' : 'static'
        console.log(` ~ AppHeader position:`, position)
        window.addEventListener('resize', onSetInnerWidth)
        return () => window.removeEventListener('resize', onSetInnerWidth)
    }, [])

    const onSetInnerWidth = () => {
        setInnerWidth(window.innerWidth)
    }
    useEffectUpdate(() => {
    }, [view])


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

    const { Search, FilterBy } = iconService
    return (
        <header className='full main-header'>
            <section className="full debug home-header">
                {/* innerWidth >= 740  &&  */}
                {<div className="logo-container">
                    <div className="logo" onClick={() => { window.history.pushState(null, null, `/`) }}></div>
                </div>}


                {/* innerWidth <= 740 &&  */}
                {<section className="container btns-filter-search">
                    <button onClick={onSetSearchBy} className="btn-circle">{Search()}</button>

                    <div className="container btns-ref-container">
                        <span role="button">Anywhere</span><br />
                        <span>Any week 	&#183; Add guests</span>
                    </div>

                    <button className="btn-circle">{FilterBy()}</button>
                </section>}



            <UserMenu />
            </section>

            {view === 'home' && <StayFilter className="debug1"onChangeFilter={onSetFilterBy} />}

            {view === 'details' && <section className="stay-details-header">
            </section>}


        </header>
    )
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const AppHeader = connect(mapStateToProps,)(_AppHeader)