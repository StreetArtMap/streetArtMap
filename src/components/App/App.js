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
import CreatePage from '../../pages/CreatePage/CreatePage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import Button from '../../UIComponents/Button/Button'

const App = () => {
  // Temporally hook checking what routes should be accessible (toggle logged in true or false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // We might be able to use the Layout as a wrapper outside the switch and then have all the routes inside that without needing to repeat Layout? 
  // const routes = isLoggedIn ? (
  //   <Switch>
  //     <Route path='/' exact>
  //       <Layout>
  //         <ExplorePage />
  //       </Layout>
  //     </Route>
  //     <Route path='/map' exact>
  //       <Layout>
  //         <MapPage />
  //       </Layout>
  //     </Route>
  //     <Route path='/create' exact>
  //       <Layout>
  //         <CreatePage />
  //       </Layout>
  //     </Route>
  //     <Route path='/profile' exact>
  //       <Layout>
  //         <ProfilePage />
  //       </Layout>
  //     </Route>
  //   </Switch>
  // ) : (
  //   <Route path='/' exact>
  //     <LoginPage />
  //   </Route>
  // )

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
          <CreatePage />
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
      <Button style='red'>CLICK</Button>
      {/* <LoadingSpinner asOverlay /> */}
    </section>
  )
}

export default App
