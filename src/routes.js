import { ExplorePage } from './pages/stay-app.jsx'

// Routes accessible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <ExplorePage />,
        label: 'Home',
    },
    {
        path: 'stay/:stayId',
        component: <stayDetails />,
        label: 'Detail',
    },

]

export default routes