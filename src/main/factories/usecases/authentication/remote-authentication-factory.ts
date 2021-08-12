import { makeApiUrl } from './../../http/axios-url-factory'
import { makeAxiosHttpClient } from './../../http/axios-http-client-factory'
import { RemoteAuthentication } from './../../../../data/usecases/authentication/remote-authentication'
import { Authentication } from './../../../../domain/usecases/authentication'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
