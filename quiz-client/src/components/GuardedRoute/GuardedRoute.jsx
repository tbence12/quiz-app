/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

function GuardedRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        auth === true ? <Component {...props} /> : <Redirect to="/" />
      }}
    />
  )
}

GuardedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  auth: PropTypes.bool.isRequired,
}

export default GuardedRoute
