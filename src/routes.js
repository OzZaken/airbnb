import { App } from './pages/stay-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { StayEdit } from './pages/stay-edit.jsx'

const routes = [
    {
        path: '/',
        component: <App />,
        label: 'Home',
    },
    {
        path: 'stay/details/:stayId',
        component: <StayDetails />,
        label: 'Detail',
    },
    {
        path: 'stay/edit/:stayId',
        component: <StayEdit />,
        label: 'Edit',
    },

]

export default routes