import '@/app';
import '@/app/styles/main.scss';
import { LoginPage } from './login-page';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new LoginPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
