// import React from 'react'
import { connect } from 'react-redux'
import PageRegister from '../components/PageRegister'
import authActions from '../actions/auth'
import paths from '../configs/paths'

const mapStateToProps = state => ({
  isLoading: state.auth.isRegisterLoading,
  isError: state.auth.isRegisterError,
  errorMsg: state.auth.registerErrorMsg,
})

const mapDispatchToProps = (dispatch, { history }) => ({
  onClickRegisterButton: async (email, username, alias, password, rePassword) => {
    const isAuth = await dispatch(
      authActions.register(email, username, alias, password, rePassword)
    )
    if (isAuth) history.push(paths.homepage)
  },
  onValidateError: errorMsg => dispatch(authActions.onRegisterError(errorMsg)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageRegister)
