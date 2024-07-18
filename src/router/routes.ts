import UserComponent from "../user";
import UserList from "../user/userList";
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
        component: UserList
    },
    {
        url: '/user/:id/:name',
        component: UserComponent,
    }
];