import React from 'react'
import { useSelector } from 'react-redux'
import './ExplorePage.css'
import ArtContainer from '../../components/ArtContainer/ArtContainer'
import { v4 as uuidv4 } from 'uuid'
import { FaStreetView } from 'react-icons/fa'

const ExplorePage = () => {
  const sortedArts = useSelector((state) => state.arts).sort(
    (a, b) => b.id - a.id
  )
  const mappedArts = sortedArts.map((art) => (
    <ArtContainer art={art} key={uuidv4()} />
  ))

  return <section className='explore-container'>{mappedArts}</section>
}

export default ExplorePage
