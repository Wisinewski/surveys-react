import { AuthenticationParams } from './../usecases/authentication'
import faker from 'faker'

export const mockAuthenticationParams = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
