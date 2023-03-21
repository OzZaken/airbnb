import { About } from './views/about'

import { UserApp } from './views/user-app'
import { UserDetails } from './views/user-details'
import { UserEdit } from './views/user-edit'

import { StayApp } from './views/stay-app'
import { StayDetails } from './views/stay-details'

const stayRoutes = [
    {
        path: '',
        label: 'Home',
        component: <StayApp />,
    },
    {
        path: 'stay/:id',
        label: 'UserDetails ',
        component: <StayDetails />
    },
]

const userRoutes = [
    {
        path: 'user',
        label: 'User App',
        component: <UserApp />
    },
    {
        path: 'user/:id',
        label: 'UserDetails ',
        component: <UserDetails />
    },
    {
        path: 'user/edit',
        label: 'UserEdit ',
        component: <UserEdit />
    },
    {
        path: 'user/edit/:id',
        label: 'UserEdit ',
        component: <UserEdit />
    },
]

const otherRoutes = [
    {
        path: 'about',
        label: 'About',
        component: <About />
    },
    {
        path: 'admin',
        label: 'DashBoard',
        component: <></>
    },
]
const routes = [...otherRoutes, ...stayRoutes, ...userRoutes,]

export default routes