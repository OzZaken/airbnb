import { useEffect, useRef } from 'react'

import { RoutesApp } from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserMsg } from './cmps/user/user-msg'

import './assets/styles/main.scss'

function App() {

    useEffect(() => {
        document.title = 'Welcome to Airbnb!'

        return () => { console.log('Airbnb Down!') }
    }, [])

    return (
        <div className="main-layout">
            <AppHeader />

            <main className='main-content'>
                <RoutesApp />
            </main>

            <UserMsg />
            <AppFooter />
        </div>
    )
}

export default App