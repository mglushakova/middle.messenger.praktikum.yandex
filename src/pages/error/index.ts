import '@/app';
import '@/styles/main.scss';
import { ErrorPage } from './error-page';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new ErrorPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
