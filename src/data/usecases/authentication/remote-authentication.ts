import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { AccountModel } from './../../../domain/models/account-model'
import { Authentication, AuthenticationParams } from './../../../domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (authenticationParams: AuthenticationParams): Promise<AccountModel> {
    await this.httpPostClient.post(this.url)
    return null
  }
}
