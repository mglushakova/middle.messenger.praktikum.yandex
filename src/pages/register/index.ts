import '@/app';
import '@/styles/main.scss';
import { RegisterPage } from './register-page';
import '@/shared/ui/form-page/form-page.scss';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new RegisterPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
