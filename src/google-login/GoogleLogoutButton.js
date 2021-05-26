import React, { Fragment, useContext } from 'react'
import { GoogleLogout } from 'react-google-login'
import { clientId, userInfo } from './googleUtil'

const GoogleLogoutButton = () => {
  const { state: userInfoState, dispatch } = useContext(userInfo)

  const onSuccess = () => {
    dispatch({ type: 'LOGOUT' })
    alert('Logout made successfully')
  }

  return (
    <Fragment>
      {userInfoState.loggedIn && (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
        />
      )}
    </Fragment>
  )
}

export default GoogleLogoutButton
