import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { SPACING } from '../configs/styles'
import LOGO from '../logo.svg'

const BG_COLOR = '#FAFAFA'

const Wrapper = styled.div`
  padding: ${SPACING.XS}px 0;
  background: ${BG_COLOR};
`

const ContentBox = styled(Container)`
  background: ${BG_COLOR};
`

const ContentRow = styled(Row)`
  justify-content: center;
  padding: ${SPACING.XS}px 0px;
`

const ItemBox = styled(Col)`
  margin: ${SPACING.XS}px;
`

const Link = styled.a`
  display: block;
  font-size: 12px;
  margin-bottom: ${SPACING.XS}px;
`

const Image = styled.img`
  width: 60px;
  height: 60px;
`

const TextTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: ${SPACING.SM}px;
`

class Footer extends React.PureComponent {
  render() {
    const { menuList } = this.props

    const menuListComponent = menuList.map((_menu, index) => (
      <ItemBox sm="12" md="2" key={`footer-menu-${index}`}>
        <TextTitle>{`FOOTER MENU ${index}`}</TextTitle>
        {Array(3)
          .fill(0)
          .map((_item, subindex) => (
            <Link
              href="#"
              key={`footer-submenu-${subindex}`}
            >{`NO ACTION LINK - ${subindex}`}</Link>
          ))}
      </ItemBox>
    ))

    return (
      <Wrapper>
        <ContentBox>
          <ContentRow>
            {menuListComponent}
            <ItemBox sm="12" md="4">
              <TextTitle>SHARE BOX</TextTitle>
              <Row>
                <Col sm="3">
                  <Image src={LOGO} />
                </Col>
                <Col sm="3">
                  <Image src={LOGO} />
                </Col>
                <Col sm="3">
                  <Image src={LOGO} />
                </Col>
              </Row>
            </ItemBox>
          </ContentRow>
        </ContentBox>
      </Wrapper>
    )
  }
}

Footer.propTypes = {
  menuList: PropTypes.array,
}

Footer.defaultProps = {
  menuList: Array(3).fill(0),
}

export default Footer
