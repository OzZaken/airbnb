import { StayApp } from './pages/stay-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'

// Routes accessible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <StayApp />,
        label: 'Home',
    },
    {
        path: 'stay/:stayId',
        component: <StayDetails />,
        label: 'Detail',
    },
    // {
    //     path: 'stay/edit/:stayId',
    //     component: <stayDetails />,
    //     label: 'Edit',
    // },

]

export default routes