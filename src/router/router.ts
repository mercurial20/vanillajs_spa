import notFound from "./404";
import { IRoute } from "./types";
import { extractParams } from "./utils";


export class Router {
    static _instance: Router;
    private root;
    constructor(private routes: IRoute[], root: HTMLElement) {
        if (Router._instance) {
            console.warn('instance already exists')
            return Router._instance;
        }
        Router._instance = this;
        this.routes = routes;
        this.root = root;
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

        this.root!.innerHTML = this.renderComponent(route);
    }

    private renderComponent = (route: IRoute) => {
        const component = route.component;
        if (typeof component === 'function') {
            return component(route.params)
        }
        return component;
    }
}

