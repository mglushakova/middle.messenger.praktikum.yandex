import '@/app';
import '@/styles/main.scss';
import './password-edit.scss';
import { PasswordEditPage } from './password-edit';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new PasswordEditPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
