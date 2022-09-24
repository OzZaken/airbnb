import { HomePage } from './views/home-page.jsx'
import { StayDetails } from './views/stay-details.jsx'
import { StayEdit } from './views/stay-edit.jsx'

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'home',
    },
    {
        path: 'stay/:stayId',
        component: <StayDetails />,
        label: 'details',
    },
    {
        path: 'stay/edit',
        component: <StayEdit />,
        label: 'add',
    },
    {
        path: 'stay/edit/:stayId',
        component: <StayEdit />,
        label: 'edit',
    },

]

export default routes