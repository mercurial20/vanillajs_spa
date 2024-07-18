import { IRoute } from "./types";

const root = document.getElementById('root') as HTMLElement;

export class Router {
    static _instance: Router;
    constructor(private routes: IRoute[]) {
        if(Router._instance) {
            console.log('instance already exists')
            return Router._instance;
        }else{
            console.log('first time')
        }
        Router._instance = this;
        this.routes = routes;
        this.initRouter()
    }

    initRouter() {
        window.addEventListener('popstate', this.renderPage)
        window.addEventListener('load', this.renderPage)
    }

    mapRoute = (url: string) => {
        const params: any = {}
        let route = this.routes.find(route => {
            const routePath = route.url.replace(/:\w+/g, '\\w+')
            const pathParams = route.url.match(/:\w+/g)
            console.log(pathParams, routePath);
            if (pathParams) {
                const urlParts = url.split('/')
                const routeParts = route.url.split('/')
                for (let i = 0; i < routeParts.length; i++) {
                    if (routeParts[i].startsWith(':')) {
                        params[routeParts[i].slice(1)] = urlParts[i] as any
                    }
                }
            }
            console.log(params);
            return new RegExp(`^${routePath}$`).test(url)
        })
        if (!route) {
            route = {
                url: '/',
                component: 'notFound',
                type: '404'
            }
        };
        route.params = params;
        return route
    }

    renderPage = () => {
        const url = window.location.pathname
        const route = this.mapRoute(url)
        console.log(url, route)

        root.innerHTML = this.renderComponent(route);
    }

    renderComponent = (route: IRoute) => {
        const component = route.component;
        if (typeof component === 'function') {
            return component(route.params)
        }
        return component;
    }
}

