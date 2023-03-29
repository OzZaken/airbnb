import { useEffect, useRef } from 'react'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserMsg } from './cmps/user/user-msg'
import { RoutesApp } from './app-routes'

// import { stayService } from '../../services/stay.service'

import './assets/styles/main.scss'

// updateReviews(reviews)
// stayService.save(stay)


function App() {
    // const totalAvgPriceRef = useRef(0)

    document.title = 'Welcome to Airbnb!'

    useEffect(() => {
        // totalAvgPriceRef.current = +getAvgPrice(DATA.gStays).toFixed(2)

        return () => {

        }
    }, [])

    return (
        <div className="main-layout">
            <AppHeader />
            <main className='main-content'><RoutesApp /></main>
            <AppFooter />
            <UserMsg />
        </div>
    )
}

export default App