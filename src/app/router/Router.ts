import { store } from '@/shared/store';
import { Route, type RouteHandler } from './Route';

export class Router {
  private routes: Route[] = [];
  private history = window.history;
  private _currentRoute: Route | null = null;

  use(
    pathname: string,
    onStart: RouteHandler,
    onLeave: RouteHandler,
    isPublic?: boolean,
  ): this {
    const route = new Route({
      pathname,
      onStart,
      onLeave,
      isPublic,
    });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    const isAuthorized = !!store.getState().user;

    if (!route || (!route.isPublic && !isAuthorized)) {
      this.go('/');
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((r) => r.match(pathname));
  }
}
