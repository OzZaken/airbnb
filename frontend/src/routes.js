import { About } from './views/about'
import { AdminApp } from './views/admin-app'
import { UserDetails } from './views/user-details'
import { UserEdit } from './views/user-edit'
import { StayApp } from './views/stay-app'
import { StayDetails } from './views/stay-details'

const base = [
    {
        path: '',
        component: <StayApp />,
        label: 'Home ',
    },
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'Admin Only'
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

const routes = [...base,...stay,...user,]

export default routes