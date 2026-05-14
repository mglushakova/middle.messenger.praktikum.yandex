import '@/app';
import '@/styles/main.scss';
import { NotFoundPage } from './not-found';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new NotFoundPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
