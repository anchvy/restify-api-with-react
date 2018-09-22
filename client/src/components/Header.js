import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import LOGO from '../logo.svg'
import { SPACING } from '../configs/styles'

const Wrapper = styled.div`
  padding: ${SPACING.XS}px 0;
`

const Image = styled.img`
  width: 100px;
  height: 100px;
`

const ContentRow = styled(Row)`
  justify-content: center;
  padding: ${SPACING.XS}px 0px;
`

const ItemBox = styled(Col)`
  text-align: center;
  margin: ${SPACING.XS}px;
  font-weight: bold;
`

const Link = styled.a``

const MENU_CONFIGS = [
  {
    text: 'NO ACTION',
    path: '/no-action-0',
  },
  {
    text: 'NO ACTION',
    path: '/no-action-1',
  },
  {
    text: 'NO ACTION',
    path: '/no-action-2',
  },
]

class Header extends React.PureComponent {
  render() {
    const menuComponent = MENU_CONFIGS.map(({ text, path }) => (
      <ItemBox sm="3" key={`header-menu-${path}`}>
        <Link className="text-body" href={path}>
          {text}
        </Link>
      </ItemBox>
    ))

    return (
      <Wrapper>
        <Container>
          <ContentRow>
            <Image src={LOGO} />
          </ContentRow>
          <ContentRow>{menuComponent}</ContentRow>
        </Container>
      </Wrapper>
    )
  }
}

export default Header
