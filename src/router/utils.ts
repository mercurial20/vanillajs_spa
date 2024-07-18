import { IRoute } from "./types";

export const extractParams = (url: string, route: IRoute): { [key: string]: string } => {
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
