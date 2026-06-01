export type RouteHandler = () => void;

export type RouteAccess = 'public' | 'guest' | 'private';

type RouteConfig = {
  pathname: string;
  onStart: RouteHandler;
  onLeave: RouteHandler;
  access: RouteAccess;
};

export class Route {
  private _pathname: string;
  private _onStart: RouteHandler;
  private _onLeave: RouteHandler;
  private _access: RouteAccess;

  constructor(config: RouteConfig) {
    this._pathname = config.pathname;
    this._onStart = config.onStart;
    this._onLeave = config.onLeave;
    this._access = config.access;
  }

  get access(): RouteAccess {
    return this._access;
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.render();
    }
  }

  render(): void {
    this._onStart();
  }

  leave(): void {
    this._onLeave();
  }
}
