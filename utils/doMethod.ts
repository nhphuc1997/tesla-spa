import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const doGet = async (url: string, params?: any) => {
  const response = await instance.get(url, { params: params })
  return response.data
}

export const doPost = async (url: string, body: Record<string, any>) => {
  const response = await instance.post(url, body)
  return response?.data
}

