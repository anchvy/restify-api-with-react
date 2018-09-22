import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import paths from '../configs/paths'

const WithAuthentication = Component => {
  class ComposedComponent extends React.Component {
    render() {
      const { isAuth } = this.props
      return isAuth ? <Component {...this.props} /> : <Redirect to={paths.login} />
    }
  }

  ComposedComponent.propTypes = {
    // redux props
    isAuth: PropTypes.bool,
  }

  ComposedComponent.defaultProps = {
    // redux props
    isAuth: false,
  }

  const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
  })

  return connect(mapStateToProps)(ComposedComponent)
}

export default WithAuthentication
