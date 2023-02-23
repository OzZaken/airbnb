// VIEWS
import { About } from './views/about'
//      - user
import { AdminApp } from './views/user/admin-app'
import { UserDetails } from './views/user/user-details'
import { UserEdit } from './views/user/user-edit'
//      - stay
import { StayApp } from './views/stay/stay-app'
import { StayDetails } from './views/stay/stay-details'
//      - car
import { CarApp } from './views/car/car-app'

// Debug
import { Demo } from './views/demo'
const demoRoutes = [
    {
        path: 'car',
        component: <CarApp />,
        label: 'Cars'
    },
    {
        path: 'demo',
        component: <Demo />,
        label: 'Demo'
    },
]
const base = [
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'Admin Only'
    },
    {
        path: '',
        component: <StayApp />,
        label: 'Home ',
    },
    {
        path: 'about',
        component: <About />,
        label: 'About'
    },
]

const stay = [
    {
        path: 'stay/:id',
        component: <StayDetails />,
        label: 'UserDetails ',
    },
]

const user = [

    {
        path: 'user',
        component: <AdminApp />,
        label: 'Admin Page',
    },
    {
        path: 'user/:id',
        component: <UserDetails />,
        label: 'UserDetails ',
    },
    {
        path: 'user/edit',
        component: <UserEdit />,
        label: 'UserEdit ',
    },
    {
        path: 'user/edit/:id',
        component: <UserEdit />,
        label: 'UserEdit ',
    },
]

const routes = [
    ...base,
    ...stay,
    ...user,
    ...demoRoutes,
]

export default routes