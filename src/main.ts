import './style.css'
import { Router } from './router/router'
import { routes } from './router/routes';

const root = document.getElementById('root') as HTMLElement;

const router = new Router(routes, root);
router.initRouter();