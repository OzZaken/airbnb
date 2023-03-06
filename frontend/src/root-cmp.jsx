import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import routes from './routes'
import { locService } from './services/loc.service'
// import { translationService } from './services/i18n.service'
import { setTitle } from './store/system.actions'
import { About } from './views/about'
import { AppHeader } from './cmps/app-header'
import { UserMsg } from './cmps/user/user-msg'
import { AppFooter } from './cmps/app-footer'
import './assets/styles/main.scss'

function App() {
    // translationService.doTrans()
    document.title = 'Welcome!'

    return (
        <div className="main-layout">
            <AppHeader />
            <main className='main-content'>
                <Routes>
                    {/* exact={true} */}
                    {routes.map(route => <Route key={route.path} element={route.component} path={route.path} />)}
                    <Route path='about' element={<About />} >
                        <Route path='team' element={<Team />} />
                        <Route path='vision' element={<Vision />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
            <UserMsg />
        </div>
    )
}

const Team = () => {
    return (
        <ul>
            <li>Moshe Leon</li>
            <li>Lala Ben Regev</li>
            <li>Shimon DiCaprio</li>
        </ul>
    )
}

const Vision = () => {
    return (
        <ol>
            <li>Save the world with odur users</li>
            <li>Take over the world with our users</li>
        </ol>
    )
}

export default App