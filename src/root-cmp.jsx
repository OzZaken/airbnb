import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import './styles/main.scss'
import { AppHeader } from './cmps/header'

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
            exact={true}
          />)}
        </Routes>
      </main>
    </div>
  )
}

export default App