import { HttpPostParams } from './../../http/http-post-client'
import { HttpPostClient } from '../../http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  params?: HttpPostParams
  async post (params: HttpPostParams): Promise<void> {
    this.params = params
    return Promise.resolve()
  }
}
