import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const Wrapper = styled.div`
  min-width: 320px;
`

const withPage = Component => {
  class ComposedComponent extends React.Component {
    render() {
      return (
        <Wrapper>
          <Header />
          <Component {...this.props} />
          <Footer />
        </Wrapper>
      )
    }
  }

  return ComposedComponent
}

export default withPage
