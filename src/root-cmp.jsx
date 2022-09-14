import React from 'react'
import routes from './routes'
// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/app-header'
export class RootCmp extends React.Component {

  render() {
    return (
      <div>
        <AppHeader />
        <main>
          <Routes>
            {routes.map(route => <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />)}
            {/* <Route path="user/:id" element={<UserDetails />} /> */}
          </Routes>
        </main>
        {/* <AppFooter /> */}
      </div>
    )
  }
}