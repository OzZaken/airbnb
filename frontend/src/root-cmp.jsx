import { Route, Routes } from 'react-router-dom'
import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { About } from './views/about'
import './assets/styles/main.scss'
import { AppFooter } from './cmps/app-footer'
import { useEffect } from 'react'
import { UserMsg } from './cmps/user-msg'
import { locService } from './services/loc.service'
// import { translationService } from './services/i18n.service'
console.log('process.env:', process.env)

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

function App() {
    document.title = 'Welcome!'
    let loading = document.title = 'loading'
    // translationService.doTrans()
    setTimeout(() => { document.title = loading += '.' }, 500)
    setTimeout(() => { document.title = loading += '.' }, 1000)
    setTimeout(() => { document.title = loading += '.' }, 1500)
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

export default App