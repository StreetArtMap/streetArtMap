import React from 'react'
import { useSelector } from 'react-redux'
import './ExplorePage.css'
import ArtContainer from '../../components/ArtContainer/ArtContainer'

const ExplorePage = () => {
  const arts = useSelector((state) => state.arts).map((art) => (
    <ArtContainer art={art}/>
  ))

  return <section className='explore-container'>{arts}</section>
}

export default ExplorePage
