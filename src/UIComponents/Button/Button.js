import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  const { children, type, disabled } = props
  // this allows us to pass any text as child
  // create different types of buttons
  // also we can pass in a boolean prop into disabled so if it is loading, it is disabled
  return (
    <button type={type} disabled={disabled}>
      {children}

      <style jsx>{`
        button {
          padding: 0.7em 1.7em;
          border: none;
          border-radius: 1.4em;
          text-transform: uppercase;
          font-family: 'Roboto', sans-serif;
          cursor: pointer;
          outline: none;
          font-size: 1em;
          color: pink;
          box-shadow: 1px 1px grey;
          background-color: green;
        }
        button:hover {
          box-shadow: 5px 4px grey;
        }
        button:active {
          box-shadow: 10px 10px grey;
        }
        button:disabled {
          color: white;
          box-shadow: 1px 2px brown;
          background-color: grey;
        }
      `}
      </style>  
    </button>

  )
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button
