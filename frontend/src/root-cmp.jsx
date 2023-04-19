import { useEffect, memo, Suspense } from 'react'
import RoutesApp from './routes'
import AppHeader from './cmps/app-header'
import AppFooter from './cmps/app-footer'
import { UserMsg } from './cmps/user/user-msg'
import './assets/styles/main.scss'

const App = memo(() => {

    useEffect(() => {
        document.title = 'Welcome to Airbnb'
        return () => {
            console.log('Bye Airbnb')
        }
    }, [])

    return <div className="main-layout">
        <AppHeader />

        <main className='main-content'>
            <Suspense fallback={<div className='view-loading'>view-loading</div>}>
                <RoutesApp />
            </Suspense>
        </main>

        <UserMsg />
        <AppFooter />
    </div>
})

export default App