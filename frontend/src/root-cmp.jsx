import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import { About } from './views/about'
import { AppHeader } from './cmps/app-header'
import { UserMsg } from './cmps/user/user-msg'
import { AppFooter } from './cmps/app-footer'
import './assets/styles/main.scss'
function App() {
    document.title = 'Welcome to Airbnb!'

    return (
        <div className="main-layout">
            <AppHeader />
            <main className='main-content'>
                <Routes>
                    {routes.map(route => <Route key={route.path} element={route.component} path={route.path} /* exact={true} */ />)}
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