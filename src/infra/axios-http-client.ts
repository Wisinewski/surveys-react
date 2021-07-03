import { HttpPostParams } from '@/data/protocols/http/http-post-client'
import axios from 'axios'

export class AxiosHttpClient {
  async post (httpPostParams: HttpPostParams<any>): Promise<void> {
    await axios(httpPostParams.url)
  }
}
