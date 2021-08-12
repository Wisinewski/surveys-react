import { HttpResponse } from '@/data/protocols/http/http-response'
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (httpPostParams: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(httpPostParams.url, httpPostParams.body)
    } catch(error) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
