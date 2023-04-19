import { Route, Routes} from 'react-router-dom'
import { About, AboutMe, Vision } from './views/about'
import { Login } from './views/login'
import { Signup } from './views/sign-up'
import { UserApp } from './views/user-app'
import { UserDetails } from './views/user-details'
import { UserEdit } from './views/user-edit'
import { StayApp } from './views/stay-app'
import { StayDetails } from './views/stay-details'


const basicsRoutes = [
    {
        path: '',
        label: 'home',
        component: <StayApp />,
    },
    {
        path: 'about',
        label: 'about',
        component: <About />
    },
    {
        path: 'admin',
        label: 'dashboard',
        component: <></>
    },
]

const authRoutes = [
    {
        path: 'login',
        label: 'login',
        component: <Login />,
    },
    {
        path: 'signup',
        label: 'signup',
        component: <Signup />,
    },
]

const userRoutes = [
    {
        path: 'user',
        label: 'user-app',
        component: <UserApp />
    },
    {
        path: 'user/:id',
        label: 'user-details ',
        component: <UserDetails />
    },
    {
        path: 'user/edit',
        label: 'user-edit ',
        component: <UserEdit />
    },
    {
        path: 'user/edit/:id',
        label: 'user-edit ',
        component: <UserEdit />
    },
]

const stayRoutes = [
    {
        path: 'stay/:id',
        label: 'user-details ',
        component: <StayDetails />
    },
]

const routes = [...basicsRoutes, ...stayRoutes, ...userRoutes, ...authRoutes]

const RoutesApp = () => {

    return <Routes>

        {routes.map(route => <Route element={route.component} path={route.path} key={route.path} />)}

        <Route path='about' element={<About />} >
            <Route path='me' element={<AboutMe />} />
            <Route path='vision' element={<Vision />} />
        </Route>

    </Routes>
}

export default RoutesApp