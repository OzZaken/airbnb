import { Route, Routes } from 'react-router-dom'
import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { About } from './views/about'
import './assets/styles/main.scss'
import { AppFooter } from './cmps/app-footer'
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
            <li>Save the world with our users</li>
            <li>Take over the world with our users</li>
        </ol>
    )
}


function App() {
    return (
        <div className="main-layout">
            <AppHeader />
            <main className='main-content'>
                <Routes>
                    {routes.map(route => {
                        return <Route key={route.path}
                            /* exact={true} */
                            element={route.component}
                            path={route.path}
                        />
                    })}
                    <Route path='about' element={<About />} >
                        <Route path='team' element={<Team />} />
                        <Route path='vision' element={<Vision />} />
                    </Route>
                </Routes>
            </main>
           <AppFooter/>
        </div>
    )
}

export default App