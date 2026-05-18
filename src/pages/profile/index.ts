import '@/app';
import '@/app/styles/main.scss';
import './profile.scss';
import { ProfilePage } from './profile-page';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new ProfilePage();

const element = page.element();

if (element) {
  document.body.append(element);
}
