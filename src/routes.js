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
        path: 'stay/:stayId',
        component: <StayDetails />,
        label: 'Detail',
    },
    {
        path: 'stay/edit',
        component: <StayEdit />,
        label: 'New stay',
    },
    {
        path: 'stay/edit/:stayId',
        component: <StayEdit />,
        label: 'Edit exists stay',
    },

]

export default routes