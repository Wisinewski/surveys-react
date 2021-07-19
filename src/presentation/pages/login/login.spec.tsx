import Login from '@/presentation/pages/login/login'
import { ValidationStub } from '@/presentation/test/mock-validation'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import React from 'react'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import faker from 'faker'
import 'jest-localstorage-mock'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (sut: RenderResult, email: string = faker.internet.email(), password: string = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email: string = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password: string = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateFieldStatus = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'OK')
  expect(fieldStatus.textContent).toBe(validationError ? '✖️' : '✔️')
}

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateFieldStatus(sut, 'email', validationError)
    simulateFieldStatus(sut, 'password', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateFieldStatus(sut, 'email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateFieldStatus(sut, 'password', validationError)
  })

  test('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateFieldStatus(sut, 'email')
  })

  test('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateFieldStatus(sut, 'password')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('should add accessToken to local storage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page on success', () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
