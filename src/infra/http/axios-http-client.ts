import { HttpResponse } from '@/data/protocols/http/http-response'
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (httpPostParams: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(httpPostParams.url, httpPostParams.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
