import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Button.css'

const Button = ({
  children,
  href,
  to,
  inverse,
  styling,
  disabled,
  type,
  onClick,
}) => {
  const className = `btn glow-on-hover btn-${styling || 'btn-default'} ${
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
      <Link to={to} className={className} onClick={onClick}>
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

export default Button

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  to: PropTypes.string,
  inverse: PropTypes.bool,
  styling: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func
}
