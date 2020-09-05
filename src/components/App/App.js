import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import './App.css'
import Layout from '../../UIComponents/Layout/Layout'
import LoginPage from '../../pages/LoginPage/LoginPage'
import ExplorePage from '../../pages/ExplorePage/ExplorePage'
import MapPage from '../../pages/MapPage/MapPage'
import CameraPage from '../../pages/CameraPage/CameraPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import Button from '../../UIComponents/Button/Button'

const App = () => {
  // Temporally hook checking what routes should be accessible (toggle logged in true or false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const routes = isLoggedIn ? (
    <Layout>
      <Switch>
        <Route path='/explore' exact>
          <ExplorePage />
        </Route>
        <Route path='/map' exact>
          <MapPage />
        </Route>
        <Route path='/create' exact>
          <CameraPage />
        </Route>
        <Route path='/profile' exact>
          <ProfilePage />
        </Route>
      </Switch>
    </Layout>
  ) : (
    <Route path='/' exact>
      <LoginPage setIsLoggedIn={setIsLoggedIn} />
    </Route>
  )

  return (
    <section className='app-container'>
      {routes}
      {/* <Button style='red'>CLICK</Button> */}
      {/* <LoadingSpinner asOverlay /> */}
    </section>
  )
}

export default App
