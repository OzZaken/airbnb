import React from 'react'
import routes from './routes'
// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer.jsx'

export class RootCmp extends React.Component {

  render() {
    return (
      <div>
        <AppHeader />
        <main className='main-app'>
          <Routes>
            {routes.map(route => <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />)}
          </Routes>
        </main>
        <AppFooter />
      </div>
    )
  }
}