import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({
  children,
  href,
  to,
  inverse,
  style,
  disabled,
  type,
  onClick,
}) => {
  const className = `btn btn-${style || 'btn-default'} ${
    inverse && 'btn-inverse'
  }`

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button

