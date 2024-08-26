import { AxiosInstance } from 'axios';

abstract class BaseAPI {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }
}

export default BaseAPI;
