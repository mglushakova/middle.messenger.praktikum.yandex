import { Route, type RouteHandler } from './Route';

type RouteInstance = {
  match(pathname: string): boolean;
  render(): void;
  leave(): void;
};

export class Router {
  private routes: RouteInstance[] = [];
  private history = window.history;
  private _currentRoute: RouteInstance | null = null;

  private static __instance: Router;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, onStart: RouteHandler, onLeave: RouteHandler): this {
    const route = new Route({
      pathname,
      onStart,
      onLeave,
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

    if (!route) return;

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

  getRoute(pathname: string): RouteInstance | undefined {
    return this.routes.find((r) => r.match(pathname));
  }
}
