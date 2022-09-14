import { HomePage } from './pages/stay-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    // {
    //     path: '/',
    //     component: <stayDetail />,
    //     label: 'detail',
    // },

]

export default routes