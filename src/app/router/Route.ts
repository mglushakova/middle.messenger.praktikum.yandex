export type RouteHandler = () => void;

type RouteConfig = {
  pathname: string;
  onStart: RouteHandler;
  onLeave: RouteHandler;
  isPublic?: boolean;
};

export class Route {
  private _pathname: string;
  private _onStart: RouteHandler;
  private _onLeave: RouteHandler;
  private _isPublic: boolean;

  constructor(config: RouteConfig) {
    this._pathname = config.pathname;
    this._onStart = config.onStart;
    this._onLeave = config.onLeave;
    this._isPublic = config.isPublic || false;
  }

  get isPublic(): boolean {
    return this._isPublic;
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
