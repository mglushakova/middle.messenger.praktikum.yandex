import Handlebars from 'handlebars';

import formPage from '@/shared/ui/form-page/form-page.hbs?raw';
import form from '@/shared/ui/form/form.hbs?raw';
import errorPage from '@/shared/ui/error-page/error-page.hbs?raw';
import profilePage from '@/shared/ui/profile-page/profile-page.hbs?raw';
import profileItem from '@/shared/ui/profile-item/profile-item.hbs?raw';
import modal from '@/shared/ui/modal/modal.hbs?raw';
import chatAvatar from '@/shared/ui/chat-avatar/chat-avatar.hbs?raw';

import '@/shared/ui/form-page/form-page.scss';
import '@/shared/ui/error-page/error-page.scss';
import '@/shared/ui/profile-page/profile-page.scss';
import '@/shared/ui/profile-item/profile-item.scss';
import '@/shared/ui/form/form.scss';
import '@/shared/ui/modal/modal.scss';
import '@/shared/ui/chat-avatar/chat-avatar.scss';

export function registerPartials() {
  Handlebars.registerPartial('form-page', formPage);
  Handlebars.registerPartial('Form', form);
  Handlebars.registerPartial('error-page', errorPage);
  Handlebars.registerPartial('profile-page', profilePage);
  Handlebars.registerPartial('profile-item', profileItem);
  Handlebars.registerPartial('Modal', modal);
  Handlebars.registerPartial('ChatAvatar', chatAvatar);
}
