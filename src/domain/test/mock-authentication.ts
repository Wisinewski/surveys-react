import { AuthenticationParams } from './../usecases/authentication'

export const mockAuthenticationParams = (): AuthenticationParams => {
  return {
    email: 'any_email',
    password: 'any_password'
  }
}
