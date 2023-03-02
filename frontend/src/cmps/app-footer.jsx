import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import AppIcon from "./app-icon"
import { BtnRadialGradient } from "./btn-triger"

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
        {view === 'home' && <>
            <nav className="footer-nav">
                <NavLink to='/'>{<AppIcon iconKey="Search" />}Explore</NavLink>
                <NavLink to='/wishlist'>{<AppIcon iconKey="Favorite" />}Wishlists</NavLink>
                <NavLink to='/trips'><div className="logo"></div> Trips</NavLink>
                <NavLink to='/inbox'>{<AppIcon iconKey="Inbox" />}Inbox</NavLink>
                <NavLink to='/user'>{<AppIcon iconKey="AccountCircle" />}Profile</NavLink>
            </nav>

            <section hidden className="wide-home-footer">
                <div className="links-container">
                    <span>&copy; 2023 AirBnb,Inc&nbsp;</span>
                    <span>&nbsp;</span>
                    <Link >&nbsp;Terms&nbsp;</Link>
                    <span>&#183;</span>
                    <Link>Sitemap&nbsp;&#183;</Link>
                    <span>&#183;</span>
                    <Link>Privacy&nbsp;&#183;</Link>
                </div>
                <AppIcon iconKey="footerSvg" />
            </section>
        </>
        }

        {view === 'about' && <section className='container'>
            AirBnb 2023 &copy; madeBy Oz Zaken
        </section>}

        {view === 'stay-details' && <section className='stay-details-footer'>
            <div>
                <b>order.price</b>
                <div className="underline">jul 2-7</div>
            </div>

            <BtnRadialGradient txt="reserve" />
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