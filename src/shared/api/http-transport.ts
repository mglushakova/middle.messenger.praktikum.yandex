import {
  queryStringify,
  type QueryData,
} from '../lib/query-stringify/query-stringify';

const API_URL = 'https://ya-praktikum.tech/api/v2';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

type Options = {
  headers?: Record<string, string>;
  method?: Method;
  data?: QueryData | FormData | string;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
};

class HTTPTransport {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get(url: string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  }

  post(url: string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  }

  put(url: string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  }

  delete(url: string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  }

  request(
    url: string,
    options: Options = {},
    timeout = 5000,
  ): Promise<unknown> {
    const fullUrl = `${API_URL}${this.endpoint}${url}`;
    const { headers = {}, method, data, responseType } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('HTTP method is required'));
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      const isGet = method === METHODS.GET;

      const requestUrl =
        isGet && data && !(data instanceof FormData)
          ? `${fullUrl}${queryStringify(data as QueryData)}`
          : fullUrl;

      xhr.open(method, requestUrl);

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response: unknown;

          if (xhr.responseType) {
            response = xhr.response;
          } else {
            try {
              const contentType = xhr.getResponseHeader('Content-Type');

              if (contentType && contentType.includes('application/json')) {
                response = JSON.parse(xhr.responseText);
              } else {
                response = xhr.responseText;
              }
            } catch {
              response = xhr.responseText;
            }
          }

          resolve(response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
            request: xhr,
          });
        }
      };

      xhr.onabort = () => {
        reject({
          reason: 'Request aborted',
          request: xhr,
        });
      };

      xhr.onerror = () => {
        reject({
          reason: 'Network error',
          request: xhr,
        });
      };

      xhr.timeout = timeout;

      xhr.ontimeout = () => {
        reject({
          reason: 'Request timeout',
          timeout,
          request: xhr,
        });
      };

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (typeof data === 'object') {
        if (!headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
