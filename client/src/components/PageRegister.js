import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label, Input, Col } from 'reactstrap'
import _ from 'lodash'
import withPage from './withPage'
import { EMPTY_FUNCTION } from '../utils/constant'
import {
  CustomLink,
  FormGroupAction,
  Wrapper,
  Container,
  Form,
  TextTitle,
  Button,
  CustomLinkText,
  ErrorBox,
} from './PageLogin'
import paths from '../configs/paths'
import { validateObjectValueExist, isEmail } from '../utils/validate'

class PageRegister extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      alias: '',
      password: '',
      rePassword: '',
    }

    this.onClickRegisterButton = this.onClickRegisterButton.bind(this)
    this.onChangeFormInput = this.onChangeFormInput.bind(this)
  }

  onChangeFormInput(event) {
    const { target } = event
    const { value } = target
    const fieldName = target.name

    this.setState({
      [fieldName]: value,
    })
  }

  onClickRegisterButton(event) {
    event.preventDefault()
    const { email, username, alias, password, rePassword } = this.state

    try {
      const validateExistInfo = validateObjectValueExist({
        email,
        username,
        alias,
        password,
        rePassword,
      })
      const passwordLength = password.length
      const aliasLength = alias.length
      const usernameLength = username.length

      // validation (api rules)
      if (!validateExistInfo.isAllExist) throw new Error(`please fill all required input.`)
      if (usernameLength < 5 || usernameLength > 20)
        throw new Error(`username must contain 5 - 50 characters.`)
      if (!isEmail(email)) throw new Error(`incorrect email format.`)
      if (aliasLength < 4 || aliasLength > 50)
        throw new Error(`alias must contain 4 - 50 characters.`)
      if (passwordLength < 8 || passwordLength > 16)
        throw new Error(`password must contain 8 - 16 characters.`)
      if (!_.isEqual(password, rePassword)) throw new Error(`password not match.`)

      this.props.onClickRegisterButton(email, username, alias, password, rePassword)
    } catch (error) {
      this.props.onValidateError(error.message)
    }
  }

  render() {
    const { email, username, password, rePassword, alias } = this.state
    const { isLoading, isError, errorMsg } = this.props

    return (
      <Wrapper>
        <Container>
          <Form>
            <FormGroup>
              <TextTitle className="display-4">Register</TextTitle>
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
              <Label sm={3}>Email</Label>
              <Col sm={9}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.onChangeFormInput}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Alias</Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="alias"
                  placeholder="Alias"
                  value={alias}
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
            <FormGroup row>
              <Label sm={3}>Re-Password</Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="rePassword"
                  placeholder="Re-Password"
                  value={rePassword}
                  onChange={this.onChangeFormInput}
                />
              </Col>
            </FormGroup>
            {isError && <ErrorBox>* {errorMsg}</ErrorBox>}
            <FormGroupAction className="text-right" row>
              <Button className={isLoading ? 'disabled' : ''} onClick={this.onClickRegisterButton}>
                Submit
              </Button>
              <CustomLink className="text-muted" href={paths.login}>
                Already have an account? <CustomLinkText>Login</CustomLinkText>
              </CustomLink>
            </FormGroupAction>
          </Form>
        </Container>
      </Wrapper>
    )
  }
}

PageRegister.propTypes = {
  // redux props
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  errorMsg: PropTypes.string,
  onClickRegisterButton: PropTypes.func,
  onValidateError: PropTypes.func,
}

PageRegister.defaultProps = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  onClickRegisterButton: EMPTY_FUNCTION,
  onValidateError: EMPTY_FUNCTION,
}

export default withPage(PageRegister)
