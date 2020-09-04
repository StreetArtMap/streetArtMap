import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const { type, placeholder, onChange, ...other } = props
  return (
    <>
      <input type={type} placeholder={placeholder} {...other} />

      {/* this styling below is throwing a console boolean error? */}
      <style jsx>{`
        input {
          outline: none;
          padding-top: 0.8em;
          padding-bottom: 0.4em;
          font-size: 1em;
          border-radius: 1vh;
          background-color: transparent;
          color: black;
          border-bottom: 1px solid grey;
          width: 'auto';
          width: 50vw;
          font-size: 2.5vh;
        }
        input:hover {
          border-bottom: 1px solid grey;
        }
        input:active {
          border-bottom: 1px solid grey;
        }
      `}</style> 
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default Input
