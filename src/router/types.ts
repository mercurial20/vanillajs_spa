
export interface IRoute {
    url: string;
    component: string | ((props: any) => string);
    type?: string;
    params?: any;
}