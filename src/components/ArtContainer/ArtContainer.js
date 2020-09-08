import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import './ArtContainer.css'

const ArtContainer = ({ art }) => {
  // console.log(art)
  // const myArray = [
  //   'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  //   'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  // ]
  // const stringified = JSON.stringify(myArray)
  // const parsed = JSON.parse(stringified)
  // const images = parsed.map((i) => <img src={i} />)

  return (
    <section className='art-container'>
      {/* {images} */}
      <ImageCarousel images={art.image_urls} height={300} />
      <ArtDetails art={art} />
    </section>
  )
}

export default ArtContainer
