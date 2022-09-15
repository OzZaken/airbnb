// import React from 'react'
// import routes from './routes'
// // const { Switch, Route } = ReactRouterDOM
// import { Routes, Route } from 'react-router'
// import { AppHeader } from './cmps/app-header'
// import { AppFooter } from './cmps/app-footer.jsx'

// export class RootCmp extends React.Component {

//   render() {
//     return (
//       <div>
//         <AppHeader />
//         <main className='main-app'>
//           <Routes>
//             {routes.map(route => <Route
//               key={route.path}
//               exact={true}
//               element={route.component}
//               path={route.path}
//             />)}
//           </Routes>
//         </main>
//         <AppFooter />
//       </div>
//     )
//   }
// }

import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header'
import './assets/styles/main.scss'
import { StayApp } from './pages/stay-app'
import { StayDetails } from './pages/stay-details'
import { AppFooter } from './cmps/app-footer'

function App() {
  return (
    <div className="main-app main-layout">
      <AppHeader />
      <main className="container">
        <Routes>
          <Route path="stay/:id" element={<StayDetails />} />
          <Route path="" element={<StayApp />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

export default App