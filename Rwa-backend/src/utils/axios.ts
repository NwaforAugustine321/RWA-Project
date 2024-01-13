import axios, { AxiosResponse } from 'axios';

export const post = async (payload: any, url: string, config: any) => {
  try {
    return await axios.post(url, payload, config);
  } catch (error) {
    throw error;
  }
};

export const get = async (url: string, config: any) => {
  try {
    return await axios.get(url, config);
  } catch (error) {}
};
