import { Route, Routes } from 'react-router-dom'
import { About, AboutMe, Vision } from './views/about'
import routes from './routes'

export const RoutesApp = () => {
    return <Routes>
        {routes.map(route => <Route key={route.path} path={route.path} element={route.component} />)}

        <Route path='about' element={<About />} >
            <Route path='me' element={<AboutMe />} />
            <Route path='vision' element={<Vision />} />
        </Route>
    </Routes>
}