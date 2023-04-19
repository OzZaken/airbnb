import { useEffect } from "react"
import { connect, useDispatch, } from "react-redux"
import { Link } from "react-router-dom"
import { setFilterBy } from '../store/stay.action'
import IconApp from "./app-icon"
import AccountMenu from "./user/user-menu"
// import { LoginSignup } from "./system/login-signup"

function _AppHeader({ view }) {
    const dispatch = useDispatch()

    useEffect(() => { }, [view])

    const onSetSearchRef = (focus) => {
        console.log(':', focus)
    }

    const onShareStay = (stay) => {
        console.log('share this stay:', stay)
    }

    // object literal
    const mainHeaderNav = { onSetSearchRef }

    const stayDetailsHeader = { onShareStay }

    return <header className='full main-header'>

        <MainHeaderNav {...mainHeaderNav} />

        {view==='stay-details' && <StayDetailsHeader {...stayDetailsHeader} />}
    </header>
}

function mapStateToProps(state) {
    const { view } = state.systemModule
    return { view }
}

const AppHeader = connect(mapStateToProps,)(_AppHeader)

const MainHeaderNav = ({ onSetSearchBy }) => {
    return <section className="main-header-nav">
        <Link to='' className="logo"></Link>

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
}

const StayDetailsHeader = ({ onShareStay }) => {
    return <section className="stay-details-header">
        <Link className="link-homes" to={''}>&lt; Homes</Link>

        <div className="btns-container">
            <button onClick={onShareStay} className="btn-share">
                <IconApp iconKey='Share' />
            </button>

            <button className="btn-favorite">
                <IconApp iconKey='Favorite' />
            </button>
        </div>
    </section>
}

export default AppHeader