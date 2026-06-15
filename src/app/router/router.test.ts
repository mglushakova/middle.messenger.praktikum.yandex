import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { Router } from './Router';
import { store } from '@/shared/store';

describe('Навигация по истории', () => {
  let router: Router;

  beforeEach(() => {
    jest.restoreAllMocks();
    router = new Router();
  });

  it('регистрирует route', () => {
    const start = jest.fn();
    const leave = jest.fn();

    router.use('/sign-up', start, leave, 'public');

    expect(router.getRoute('/sign-up')).toBeDefined();
  });

  it('вызывает pushState когда вызван go', () => {
    const pushStateSpy = jest.spyOn(window.history, 'pushState');

    router.use('/sign-up', jest.fn(), jest.fn(), 'public');

    router.go('/sign-up');

    expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/sign-up');
  });

  it('редиректит на 404 для неизвестного роута', () => {
    const pushStateSpy = jest.spyOn(window.history, 'pushState');

    router.use('/404', jest.fn(), jest.fn(), 'public');

    router.go('/unknown');

    expect(pushStateSpy).toHaveBeenLastCalledWith({}, '', '/404');
  });

  it('защищает приватный роут', () => {
    store.setState('user', null);

    const pushStateSpy = jest.spyOn(window.history, 'pushState');

    router.use('/', jest.fn(), jest.fn(), 'public');
    router.use('/messenger', jest.fn(), jest.fn(), 'private');

    router.go('/messenger');

    expect(pushStateSpy).toHaveBeenLastCalledWith({}, '', '/');
  });

  it('позволяет авторизованному пользователю открывать приватный роут', () => {
    store.setState('user', { id: 1 });

    const render = jest.fn();

    router.use('/messenger', render, jest.fn(), 'private');

    router.go('/messenger');

    expect(render).toHaveBeenCalled();
  });
});
