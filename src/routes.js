import { HomePage } from './views/home-page.jsx'
import { StayDetails } from './views/stay-details.jsx'
import { StayEdit } from './views/stay-edit.jsx'

const routes = [
    {
        label: 'home',
        path: '',
        component: <HomePage />,
    },
    {
        label: 'about',
        path: 'about',
        component: <HomePage />,
    },
    {
        label: 'help',
        path: 'help',
        component: <HomePage />,
    },
    {
        label: 'add',
        path: 'stay/edit',
        component: <StayEdit />,
    },
    {
        label: 'edit',
        path: 'stay/edit/:stayId',
        component: <StayEdit />,
    },
    {
        label: 'details',
        path: 'stay/:stayId',
        component: <StayDetails />,
    },
    {
        label: 'signup-login',
        path: 'signup_login',
        component: <StayDetails />,
    },
    {
        label: 'login',
        path: 'login',
        component: <StayDetails />,
    },
    {
        label: 'user-setting',
        path: 'user/:userName',
        component: <StayDetails />,
    },


]

export default routes