import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Router } from './Router';
import { store } from '@/shared/store';

describe('Навигация по истории', () => {
  let router: Router;

  beforeEach(() => {
    vi.restoreAllMocks();
    router = new Router();
  });

  it('регистрирует route', () => {
    const start = vi.fn();
    const leave = vi.fn();

    router.use('/sign-up', start, leave, 'public');

    expect(router.getRoute('/sign-up')).toBeDefined();
  });

  it('вызывает pushState когда вызван go', () => {
    const pushStateSpy = vi.spyOn(window.history, 'pushState');

    router.use('/sign-up', vi.fn(), vi.fn(), 'public');

    router.go('/sign-up');

    expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/sign-up');
  });

  it('редиректит на 404 для неизвестного роута', () => {
    const pushStateSpy = vi.spyOn(window.history, 'pushState');

    router.use('/404', vi.fn(), vi.fn(), 'public');

    router.go('/unknown');

    expect(pushStateSpy).toHaveBeenLastCalledWith({}, '', '/404');
  });

  it('защищает приватный роут', () => {
    store.setState('user', null);

    const pushStateSpy = vi.spyOn(window.history, 'pushState');

    router.use('/', vi.fn(), vi.fn(), 'public');
    router.use('/messenger', vi.fn(), vi.fn(), 'private');

    router.go('/messenger');

    expect(pushStateSpy).toHaveBeenLastCalledWith({}, '', '/');
  });

  it('позволяет авторизованному пользователю открывать приватный роут', () => {
    store.setState('user', { id: 1 });

    const render = vi.fn();

    router.use('/messenger', render, vi.fn(), 'private');

    router.go('/messenger');

    expect(render).toHaveBeenCalled();
  });
});
