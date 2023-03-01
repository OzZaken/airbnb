import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import AppIcon from "./app-icon"

function _AppFooter({ view }) {
    useEffectUpdate(() => { }, [view])

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    useEffect(() => {
        const position = view === 'home' ? 'fixed' : 'static'
        console.log(`🚀 ~ footer position:`, position)
        window.addEventListener('resize', onSetInnerWidth)
        return () => window.removeEventListener('resize', onSetInnerWidth)
    }, [])

    const onSetInnerWidth = () => {
        setInnerWidth(window.innerWidth)
    }

    // Navigate
    const navigate = useNavigate()
    const onBack = () => {
        navigate('/')
    }

    return <footer className='main-footer'>

        {view === 'home' && innerWidth <= 768 && <nav className="footer-nav">
            <NavLink to='/'>{<AppIcon iconKey="Search" />}Explore</NavLink>
            <NavLink to='/wishlist'>{<AppIcon iconKey="Favorite" />}Wishlists</NavLink>
            <NavLink to='/trips'><div className="logo"></div> Trips</NavLink>
            <NavLink to='/inbox'>{<AppIcon iconKey="Inbox" />}Inbox</NavLink>
            <NavLink to='/user'>{<AppIcon iconKey="AccountCircle" />}Profile</NavLink>
        </nav>}

        {view === 'about' && <section className='container'>
            AirBnb 2023 &copy; madeBy Oz Zaken
        </section>}

        {false && <section className="nav-back">
            <button onClick={onBack}>Back</button>
        </section>}

    </footer>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const AppFooter = connect(mapStateToProps,)(_AppFooter)