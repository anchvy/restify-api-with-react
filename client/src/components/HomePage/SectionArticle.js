import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import CardArticle from './CardArticle'
import { SPACING } from '../../configs/styles'

const Wrapper = styled.div``
const ItemBox = styled.div`
  margin-bottom: ${SPACING.MD}px;
`

class SectionArticle extends React.PureComponent {
  render() {
    const { articles } = this.props

    const articlesComponent = Object.values(articles).map(article => (
      <Col sm="12" md="6" lg="3" key={`article-${article.articleId}`}>
        <ItemBox>
          <CardArticle image={article.imageUrl} title={article.title} content={article.content} />
        </ItemBox>
      </Col>
    ))

    return (
      <Wrapper>
        <Container>
          <Row>{articlesComponent}</Row>
        </Container>
      </Wrapper>
    )
  }
}

SectionArticle.propTypes = {
  articles: PropTypes.object,
}

SectionArticle.defaultProps = {
  articles: {},
}

export default SectionArticle
