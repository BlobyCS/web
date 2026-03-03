import { Router } from './router/Router';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
const app = document.getElementById('app') as HTMLElement;
const router = new Router(app);

router.register('/', () => Home());
router.register('/profile/:player', (params) => Profile(params));
router.register('/terms', () => Terms());
router.register('/privacy', () => Privacy());
router.register('*', () => NotFound());

router.init();