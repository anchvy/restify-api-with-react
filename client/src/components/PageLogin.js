import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Jumbotron,
  Container as DefaultContainer,
  Button as DefaultButton,
  Form as DefaultForm,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap'
import withPage from './withPage'
import { EMPTY_FUNCTION } from '../utils/constant'
import paths from '../configs/paths'
import { SPACING } from '../configs/styles'
import { validateObjectValueExist } from '../utils/validate'

const BG_COLOR = '#F2F2F2'

export const Wrapper = styled(Jumbotron)`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 0;
  background: ${BG_COLOR};
`
export const Container = styled(DefaultContainer)`
  background: ${BG_COLOR};
`

export const FormGroupAction = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const Form = styled(DefaultForm)`
  max-width: 500px;
  margin: auto;
`

export const TextTitle = styled.h1``

export const Button = styled(DefaultButton)`
  width: 150px;
  margin-bottom: ${SPACING.XS}px;
`

export const CustomLink = styled.a`
  font-size: 14px;
  cursor: pointer;
`

export const CustomLinkText = styled.span`
  font-weight: bold;
`

export const ErrorBox = styled(FormGroup)`
  font-size: 12px;
  color: red;
`

class PageLogin extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    this.onClickLoginButton = this.onClickLoginButton.bind(this)
    this.onChangeFormInput = this.onChangeFormInput.bind(this)
  }

  onClickLoginButton(event) {
    event.preventDefault()
    const { username, password } = this.state

    try {
      const validateExistInfo = validateObjectValueExist({ username, password })

      // validation
      if (!validateExistInfo.isAllExist) throw new Error(`please fill all required input.`)

      this.props.onClickLoginButton(username, password)
    } catch (error) {
      this.props.onValidateError(error.message)
    }
  }

  onChangeFormInput(event) {
    const { target } = event
    const { value } = target
    const fieldName = target.name

    this.setState({
      [fieldName]: value,
    })
  }

  render() {
    const { username, password } = this.state
    const { isLoading, isError, errorMsg } = this.props

    return (
      <Wrapper>
        <Container>
          <Form>
            <FormGroup>
              <TextTitle className="display-4">SignIn</TextTitle>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Username</Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.onChangeFormInput}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Password</Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChangeFormInput}
                />
              </Col>
            </FormGroup>
            {isError && <ErrorBox>* {errorMsg}</ErrorBox>}
            <FormGroupAction className="text-right">
              <Button className={isLoading ? 'disabled' : ''} onClick={this.onClickLoginButton}>
                Submit
              </Button>
              <CustomLink className="text-muted" href={paths.register}>
                Don't have an account yet? <CustomLinkText>Register</CustomLinkText>
              </CustomLink>
            </FormGroupAction>
          </Form>
        </Container>
      </Wrapper>
    )
  }
}

PageLogin.propTypes = {
  // redux props
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  errorMsg: PropTypes.string,
  onClickLoginButton: PropTypes.func,
  onValidateError: PropTypes.func,
}

PageLogin.defaultProps = {
  // redux props
  isLoading: false,
  isError: false,
  errorMsg: '',
  onClickLoginButton: EMPTY_FUNCTION,
  onValidateError: EMPTY_FUNCTION,
}

export default withPage(PageLogin)
