import UserComponent from "../user";
import { IRoute } from "./types";

export const routes: IRoute[] = [
    {
        url: '/',
        component: `
            <h1>Home</h1>
            <p>Welcome to Home Page</p>
        `
    },
    {
        url: '/users',
        component: `
            <h1>Users</h1>
            <p>Users List</p>
        `
    },
    {
        url: '/user/:id/:name',
        component: UserComponent,
    }
];