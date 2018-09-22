import React from 'react'
import {
  Card,
  CardBody,
  CardTitle as DefaultCardTitle,
  CardText as DefaultCardText,
  CardImg as DefaultCardImg,
} from 'reactstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CardTitle = styled(DefaultCardTitle)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const CardImg = styled(DefaultCardImg)`
  height: 180px;
`

const CardText = styled(DefaultCardText)`
  height: 100px;
  overflow: hidden;
`

const DEFAULT_IMAGE_URL =
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'

class CardArticle extends React.PureComponent {
  render() {
    const { image, title, content } = this.props

    return (
      <Card>
        <CardImg top width="100%" src={image || DEFAULT_IMAGE_URL} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{content}</CardText>
        </CardBody>
      </Card>
    )
  }
}

CardArticle.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
}

CardArticle.defaultProps = {
  image: DEFAULT_IMAGE_URL,
  title: '',
  content: '',
}

export default CardArticle
