type RouteParams = Record<string, string>;
type RouteHandler = (params: RouteParams) => HTMLElement;

interface Route {
  pattern: string;
  regex: RegExp;
  keys: string[];
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];
  private outlet: HTMLElement;

  constructor(outlet: HTMLElement) {
    this.outlet = outlet;
  }

  register(pattern: string, handler: RouteHandler): void {
    const keys: string[] = [];

    const regexSource = pattern
      .replace(/\//g, '\/')
      .replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, (_: string, key: string) => {
        keys.push(key);
        return '([^\/]+)';
      });

    const regex =
      pattern === '*'
        ? /.*/
        : new RegExp('^' + regexSource + '$');

    this.routes.push({ pattern, regex, keys, handler });
  }

  navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.resolve(path);
  }

  init(): void {
    window.addEventListener('popstate', () => {
      this.resolve(window.location.pathname);
    });

    document.addEventListener('click', (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a');

      if (!target) return;

      const href = target.getAttribute('href');

      if (!href || href.startsWith('http') || href.startsWith('//')) return;

      event.preventDefault();
      this.navigate(href);
    });

    this.resolve(window.location.pathname);
  }

  private resolve(path: string): void {
    for (const route of this.routes) {
      const match = path.match(route.regex);

      if (!match) continue;

      const params: RouteParams = {};

      route.keys.forEach((key: string, index: number) => {
        params[key] = decodeURIComponent(match[index + 1]);
      });

      const page = route.handler(params);

      this.render(page);
      return;
    }
  }

  private render(page: HTMLElement): void {
    this.outlet.innerHTML = '';
    this.outlet.appendChild(page);
  }
}
