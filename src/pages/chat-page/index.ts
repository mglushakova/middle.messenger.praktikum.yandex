import '@/app';
import '@/app/styles/main.scss';
import './chat-page.scss';
import { ChatPage } from './chat-page';
import { registerPartials } from '@/shared/lib/handlebars/registerPartials';

registerPartials();

const page = new ChatPage();

const element = page.element();

if (element) {
  document.body.append(element);
}
