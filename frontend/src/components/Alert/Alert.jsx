import PropTypes from 'prop-types'

import './Alert.css'

function Alert({ message, type }) {

  if (!message) return null

  return (

    <div className={`custom-alert ${type}`}>

      {message}

    </div>
  )
}

Alert.propTypes = {

  message: PropTypes.string,

  type: PropTypes.oneOf([
    'success',
    'error'
  ])
}

export default Alert