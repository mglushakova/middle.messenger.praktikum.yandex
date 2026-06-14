import { describe, it, expect, vi, beforeEach } from 'vitest';
import HTTPTransport from './http-transport';
import { API_URL } from '../config/api';

describe('HTTPTransport', () => {
  let openMock: ReturnType<typeof vi.fn>;
  let sendMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    openMock = vi.fn();
    sendMock = vi.fn();

    class MockXHR {
      open = openMock;
      send = sendMock;

      setRequestHeader = vi.fn();

      withCredentials = false;
      timeout = 0;

      onload = null;
      onerror = null;
      onabort = null;
      ontimeout = null;
    }

    vi.stubGlobal('XMLHttpRequest', MockXHR);
  });

  it('вызывает метод GET', () => {
    const api = new HTTPTransport('/test');

    api.get('/users');

    expect(openMock).toHaveBeenCalledWith('GET', `${API_URL}/test/users`);
  });

  it('вызывает метод POST', () => {
    const api = new HTTPTransport('/test');

    api.post('/users', {
      data: {
        login: 'ivan',
      },
    });

    expect(openMock).toHaveBeenCalledWith('POST', `${API_URL}/test/users`);
  });

  it('отправляет POST данные', () => {
    const api = new HTTPTransport('/test');

    void api.post('/users', {
      data: {
        login: 'ivan',
      },
    });

    expect(sendMock).toHaveBeenCalledWith(
      JSON.stringify({
        login: 'ivan',
      }),
    );
  });

  it('передает GET параметры как строку', () => {
    const api = new HTTPTransport('/test');

    void api.get('/users', {
      data: {
        login: 'ivan',
        limit: 10,
      },
    });

    const url = openMock.mock.calls[0][1];

    expect(url).toContain('login=ivan');
    expect(url).toContain('limit=10');
  });

  it('GET не отправляет body', () => {
    const api = new HTTPTransport('/test');

    void api.get('/users');

    expect(sendMock).toHaveBeenCalledWith();
  });

  it('вызывает метод PUT', () => {
    const api = new HTTPTransport('/test');

    void api.put('/users');

    expect(openMock).toHaveBeenCalledWith('PUT', `${API_URL}/test/users`);
  });

  it('вызывает метод DELETE', () => {
    const api = new HTTPTransport('/test');

    void api.delete('/users');

    expect(openMock).toHaveBeenCalledWith('DELETE', `${API_URL}/test/users`);
  });

  it('отправляет FormData без сериализации', () => {
    const api = new HTTPTransport('/test');

    const formData = new FormData();
    formData.append('avatar', 'file');

    void api.post('/users', {
      data: formData,
    });

    expect(sendMock).toHaveBeenCalledWith(formData);
  });
});
