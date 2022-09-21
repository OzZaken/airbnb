import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import './styles/main.scss'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'

function App() {
  return (
    <div>
      <AppHeader />
      <main className='main-container main-app'>
        <Routes>
          {routes.map(route => <Route
            key={route.path}
            element={route.component}
            path={route.path}
            dataRoute={route.label}
            exact={true}
          />)}
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

export default App