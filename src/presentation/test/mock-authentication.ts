import { mockAccountModel } from './../../domain/test/mock-account'
import { AccountModel } from './../../domain/models/account-model'
import { AuthenticationParams } from './../../domain/usecases/authentication'
import { Authentication } from '@/domain/usecases/authentication'

export class AuthenticationSpy implements Authentication {
  account: AccountModel = mockAccountModel()
  params: AuthenticationParams
  async auth (authenticationParams: AuthenticationParams): Promise<AccountModel> {
    this.params = authenticationParams
    return Promise.resolve(this.account)
  }
}
