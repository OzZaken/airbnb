import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import routes from './routes'
import './styles/main.scss'
import { AppHeader } from './cmps/header'
import { userService } from "./services/user.service";
import { LoginSignup } from './cmps/login-signup'

function App() {
  //  User 
  const [user, setLoggedInUser] = useState(userService.getLoggedinUser())
  const navigate = useNavigate()

  function onLogOut() {
    userService.logout()
    setLoggedInUser(null)
    navigate('/')
  }

  //   const onLogOut = async () => {
  //     await dispatch(onLogout())
  //     navigate('/')
  // }

  return (
    <React.Fragment>
      <AppHeader user={user} onLogOut={onLogOut} />
      <main className='main-layout main-app'>
        <Routes>
          {routes.map(route => <Route
            key={route.path}
            element={route.component}
            path={route.path}
            exact={true}
          />)}
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default App