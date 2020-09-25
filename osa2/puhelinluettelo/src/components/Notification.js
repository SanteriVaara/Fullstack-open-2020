import React from 'react'

const Notification = ({ notification, errorMessage }) => {
    if (notification !== null) {
        return (
            <div className="notification">
              {notification}
            </div>
          )
    }
    else if (errorMessage !== null) {
        return (
            <div className="error">
              {errorMessage}
            </div>
          )
    }
    else {
        return null
    }
  }

export default Notification