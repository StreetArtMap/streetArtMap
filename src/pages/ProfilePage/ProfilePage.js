import React from 'react'
import './ProfilePage.css'
import '../../variables.css'
import { FaHeart, FaBookOpen, FaBookmark, FaFolder, FaRegHeart, FaCheck } from 'react-icons/fa'


const ProfilePage = () => {
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
        <img src={`https://images.unsplash.com/photo-1532743869468-90b42b7455dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80`} alt="art1" className="art-tile" />
        <img src={`https://images.unsplash.com/photo-1517604479449-5f8b33656096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=987&q=80`} alt="art2" className="art-tile" />
        <img src={`https://images.unsplash.com/photo-1533429429847-25196ff379cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80`} alt="art3" className="art-tile" />
        <img src={`https://images.unsplash.com/photo-1542574566-220003c67621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80`} alt="art4" className="art-tile" />
        <img src={`https://images.unsplash.com/photo-1528886050511-50b2248e8dcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1624&q=80`} alt="art5" className="art-tile" />
        <img src={`https://images.unsplash.com/photo-1483481738355-5ea215020724?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1612&q=80`} alt="art6" className="art-tile" />
        <img src={`https://images.unsplash.com/photo-1516943294273-ea1986b95f25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80`} alt="art7" className="art-tile" />
      </section>
    </section>
  ) 
}

export default ProfilePage
