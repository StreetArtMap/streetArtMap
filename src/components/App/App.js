import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../../UIComponents/Layout/Layout'
import LoginPage from '../../pages/LoginPage/LoginPage'
import ExplorePage from '../../pages/ExplorePage/ExplorePage'
import MapPage from '../../pages/MapPage/MapPage'
import CameraPage from '../../pages/CameraPage/CameraPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import PaintingCard from '../PaintingCard/PaintingCard'
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const routes = (
    <Layout isLoggedIn={isLoggedIn}>
      <Switch>
        <Route path='/explore' exact>
          {!isLoggedIn ? <Redirect to='/' /> : <ExplorePage />}
        </Route>
        <Route path='/map' exact>
          {!isLoggedIn ? <Redirect to='/' /> : <MapPage />}
        </Route>
        <Route path='/create' exact>
          {!isLoggedIn ? <Redirect to='/' /> : <CameraPage />}
        </Route>
        <Route path='/profile' exact>
          {!isLoggedIn ? <Redirect to='/' /> : <ProfilePage />}
        </Route>
        <Route path='/arts/:id' exact>
          {!isLoggedIn ? <Redirect to='/' /> : <PaintingCard />}
        </Route>
        <Route path='/'>
          {isLoggedIn ? (
            <Redirect to='/explore' />
          ) : (
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        </Route>
      </Switch>
    </Layout>
  )

  return <section className='app-container'>{routes}</section>
}

export default App
