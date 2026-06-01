import '@/app';
import '@/app/styles/main.scss';
import { routes, router } from '@/app/router';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';
import { authController } from './features/auth';
import { store } from './shared/store';

registerPartials();

document.addEventListener('click', (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const link = target.closest('a');

  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  const href = link.getAttribute('href');

  if (!href) {
    return;
  }

  event.preventDefault();

  router.go(href);
});

routes.forEach(({ path, page: Page, isPublic }) => {
  router.use(
    path,
    () => {
      const page = new Page();
      document.querySelector('#app')?.replaceChildren(page.element()!);
    },
    () => {},
    isPublic,
  );
});

try {
  const user = await authController.fetchUser();

  store.setState('user', user);
} catch (error) {
  store.setState('user', null);

  throw error;
}

router.start();
