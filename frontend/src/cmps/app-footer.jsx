import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { iconService } from "../services/svg.service"

function _AppFooter({ view }) {
    useEffectUpdate(() => {
    }, [view])

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
        {false && (
            <section className="back">
                <button onClick={onBack}>Back</button>
            </section>
        )}

        {innerWidth <= 768 && <nav className="footer-nav">
            <NavLink to='/'>{iconService.Search()}Explore</NavLink>
            <NavLink to='/wishlist'>{iconService.Favorite()}Wishlists</NavLink>
            <NavLink className="logo" to='/trips'>Trips</NavLink>
            <NavLink to='/inbox'>{iconService.Inbox()}Inbox</NavLink>
            <NavLink to='/user'>{iconService.AccountCircle()}Profile</NavLink>
        </nav>}

        {view === 'about' && <section className='container'>
            AirBnb 2023 &copy; madeBy Oz Zaken
        </section>}
    </footer>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return {
        view
    }
}

export const AppFooter = connect(mapStateToProps,)(_AppFooter)