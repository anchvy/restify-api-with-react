import React from 'react'
import { Jumbotron, Container as DefaultContainer } from 'reactstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BG_COLOR = '#F2F2F2'

const Wrapper = styled(Jumbotron)`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  background: ${BG_COLOR};
`

const Container = styled(DefaultContainer)`
  background: ${BG_COLOR};
  text-align: center;
`

const HeaderText = styled.h3``
const Text = styled.p``
const Separator = styled.hr``

const contentsMockup = [
  'You can use Lorem text and placeholder images anywhere you want',
  'You can modify the design if you have a better idea',
  '(Optional) Make React reusable components from the web page',
]

class SectionContent extends React.PureComponent {
  render() {
    const { contents, alias } = this.props

    const contentsComponent = contents.map((content, index) => (
      <Text key={`contents-${index}`} className="lead">
        {content}
      </Text>
    ))

    return (
      <Wrapper>
        <Container>
          <HeaderText className="display-3">Hello, {alias || 'world'}!</HeaderText>
          {contentsComponent}
          <Separator />
          <Text>Please push your code to your Github and send the link to :D</Text>
        </Container>
      </Wrapper>
    )
  }
}

SectionContent.propTypes = {
  alias: PropTypes.string,
  contents: PropTypes.array,
}

SectionContent.defaultProps = {
  alias: undefined,
  contents: contentsMockup,
}

export default SectionContent
