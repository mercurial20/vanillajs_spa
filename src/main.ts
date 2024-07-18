import './style.css'
import { Router } from './router/router'
import { routes } from './router/routes';

const router = new Router(routes);
router.initRouter();