import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

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
    <textarea rows={rows || 3} placeholder={placeholder} {...other} />
  )

  return (
    <section>
      <label htmlFor={id}>{label}</label>
      {tag}
      {!isValid && <p>{errorMessage}</p>}
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
