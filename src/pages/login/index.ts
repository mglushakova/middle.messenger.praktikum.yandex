import '@/app';
import '@/styles/main.scss';
import { LoginPage } from './login-page';
import '@/shared/ui/form-page/form-page.scss';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new LoginPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
