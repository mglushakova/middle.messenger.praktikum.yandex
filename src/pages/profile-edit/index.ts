import '@/app';
import '@/app/styles/main.scss';
import './profile-edit.scss';
import { ProfileEditPage } from './profile-edit';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new ProfileEditPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
