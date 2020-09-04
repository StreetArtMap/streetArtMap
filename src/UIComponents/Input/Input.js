import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const {
    id,
    label,
    type,
    placeholder,
    onChange,
    element,
    rows,
    errorMessage,
    isValid,
    ...other
  } = props

  const tag = !element ? (
    <input type={type} placeholder={placeholder} {...other} />
  ) : (
    <textarea rows={rows || 3} placeholder={placeholder} />
  )

  return (
    <section>
      <label htmlFor={id}>{label}</label>
      {tag}
      {!isValid && <p>{errorMessage}</p>}
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
    </section>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default Input
