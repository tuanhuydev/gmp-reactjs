import axios from 'axios';
import { camelizeObject } from '../utils/movieHelpers';

export const httpClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data) => {
      try {
        const modifiedObject = camelizeObject(data);
        const payload = JSON.stringify(modifiedObject);
        return payload;
      } catch (error) {
        return data;
      }
    },
  ],
  transformResponse: [
    (data) => {
      return data;
    },
  ],
});
