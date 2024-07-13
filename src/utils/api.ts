import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const request = async (route: string, options?: any) => {
  try {
    const { method = 'GET', body = null } = options || {}

    const fetchOptions: AxiosRequestConfig = {
      url: route,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (body) {
      fetchOptions.data = JSON.stringify(body)
    }

    const response: AxiosResponse = await axios(route, fetchOptions)

    return response.data
  } catch (err) {
    console.log('err', err)
  }
}
