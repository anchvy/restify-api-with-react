// import React from 'react'
import { connect } from 'react-redux'
import PageLogin from '../components/PageLogin'
import authActions from '../actions/auth'
import paths from '../configs/paths'

const mapStateToProps = state => ({
  isLoading: state.auth.isLoginLoading,
  isError: state.auth.isLoginError,
  errorMsg: state.auth.loginErrorMsg,
})

const mapDispatchToProps = (dispatch, { history }) => ({
  onClickLoginButton: async (username, password) => {
    const isAuth = await dispatch(authActions.login(username, password))
    if (isAuth) history.push(paths.homepage)
  },
  onValidateError: errorMsg => dispatch(authActions.onLoginError(errorMsg)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageLogin)
