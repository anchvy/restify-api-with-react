import React from 'react'
import PropTypes from 'prop-types'
import withPage from './withPage'
import SectionContent from './HomePage/SectionContent'
import SectionArticle from './HomePage/SectionArticle'
import { EMPTY_FUNCTION } from '../utils/constant'

class PageHomePage extends React.PureComponent {
  componentDidMount() {
    // User action
    const { fetchUserData, isFetchUserError } = this.props
    if (!isFetchUserError) {
      fetchUserData()
    }
    // Article action
    const { fetchArticleList } = this.props
    fetchArticleList()
  }

  render() {
    const { articles, alias } = this.props

    return (
      <React.Fragment>
        <SectionContent alias={alias} />
        <SectionArticle articles={articles} />
      </React.Fragment>
    )
  }
}

PageHomePage.propTypes = {
  // redux props
  articles: PropTypes.object,
  alias: PropTypes.string,
  fetchUserData: PropTypes.func,
  fetchArticleList: PropTypes.func,
  isFetchUserError: PropTypes.bool,
}

PageHomePage.defaultProps = {
  // redux props
  articles: {},
  alias: undefined,
  fetchUserData: EMPTY_FUNCTION,
  fetchArticleList: EMPTY_FUNCTION,
  isFetchUserError: false,
}

export default withPage(PageHomePage)
