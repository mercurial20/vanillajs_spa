import notFound from "./404";
import { IRoute } from "./types";

const root = document.getElementById('root') as HTMLElement;

function extractParams(url: string, route: IRoute): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    const urlParts = url.split('/');
    const routeParts = route.url.split('/');

    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
            params[routeParts[i].slice(1)] = urlParts[i];
        }
    }
    return params;
}

export class Router {
    static _instance: Router;
    constructor(private routes: IRoute[]) {
        if (Router._instance) {
            console.warn('instance already exists')
            return Router._instance;
        }
        Router._instance = this;
        this.routes = routes;
    }

    initRouter() {
        window.addEventListener('popstate', this.renderPage, { once: true })
        window.addEventListener('load', this.renderPage, { once: true })
    }

    private mapRoute = (url: string) => {
        const route = this.routes.find(route => {
            const routePath = route.url.replace(/:\w+/g, '\\w+')
            return new RegExp(`^${routePath}$`).test(url)
        })
        if (!route) {
            return notFound;
        };
        const params = extractParams(url, route)
        return {...route, params};
    }

    private renderPage = () => {
        const url = window.location.pathname
        const route = this.mapRoute(url)

        root.innerHTML = this.renderComponent(route);
    }

    private renderComponent = (route: IRoute) => {
        const component = route.component;
        if (typeof component === 'function') {
            return component(route.params)
        }
        return component;
    }
}

