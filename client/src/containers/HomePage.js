// import React from 'react'
import { connect } from 'react-redux'
import PageHomePage from '../components/PageHomePage'
import WithAuthentication from './WithAuthentication'
import authActions from '../actions/auth'
import articleActions from '../actions/article'

const mapStateToProps = state => ({
  articles: state.article.list,
  alias: state.auth.info.alias,
  isFetchUserError: state.auth.isFetchError,
})

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => dispatch(authActions.fetchUserData()),
  fetchArticleList: () => dispatch(articleActions.fetchArticleList()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithAuthentication(PageHomePage))
