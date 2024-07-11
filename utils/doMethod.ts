import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://localhost:3001/backend',
  baseURL: 'http://13.213.88.50/backend',
  timeout: 1000,
  headers: { 'X-Custom-Header': '' }
});

export const doGet = async (url: string, params?: any) => {
  const response = await instance.get(url, { params: params })
  return response.data
}

export const doPost = async (url: string, body: Record<string, any>) => {
  const response = await instance.post(url, body)
  return response?.data
}

