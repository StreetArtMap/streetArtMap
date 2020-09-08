import React from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_IMG_URL } from '../../constants'
import './ProfilePage.css'
import '../../variables.css'
import { FaBookOpen, FaBookmark } from 'react-icons/fa'


const ProfilePage = () => {
  const addDefaultImageSrc = (e) => {
    e.target.src = DEFAULT_IMG_URL
  }
  const arts = useSelector((state) => state.arts).map((art) => (
    <img src={addDefaultImageSrc} alt="sdfadfsa" onError={addDefaultImageSrc} />
  ))


  return (
    <section className="profile-container">
      <section className="user-details-container">
        <section className="user-image">
          <img src={`https://images.unsplash.com/photo-1595790752141-3bad67318327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80`} alt="human-user" className="user-profile-image"/>
        </section>
        <section className="user-stats">
          <p className="username">UserName Here</p>
          <p className="user-image-count">10 Images Saved</p>
          <p className="user-image-count">55 Posts</p>
          <section className="button-container">
            <section className="all-button"><FaBookOpen className='art-icon' title="collection-icon" /></section>
            <section className="saved-button"><FaBookmark className='art-icon' title="bookmark-icon" />
            </section>
          </section>
        </section>
      </section>
      <section className="photo-container">
       {arts}
      </section>
    </section>
  ) 
}

export default ProfilePage
