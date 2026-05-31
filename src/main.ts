import '@/app';
import '@/app/styles/main.scss';
import { routes, router } from '@/app/router';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

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

routes.forEach(({ path, page: Page }) => {
  router.use(
    path,
    () => {
      const page = new Page();
      document.querySelector('#app')?.replaceChildren(page.element()!);
    },
    () => {},
  );
});

router.start();
