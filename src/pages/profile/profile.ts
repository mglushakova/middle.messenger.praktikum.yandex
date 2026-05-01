import Handlebars from 'handlebars';
import '@/styles/main.scss';
import './profile.scss';
import '@/layout/profile-page/profile-page.scss';
import profileTemplate from './profile.hbs?raw';
import profilePageTemplate from '@/layout/profile-page/profile-page.hbs?raw';
import avatarIcon from '@/blocks/avatar/avatar.hbs?raw';
import '@/blocks/avatar/avatar.scss';
import profileItem from '@/blocks/profile-item/profile-item.hbs?raw';
import '@/blocks/profile-item/profile-item.scss';

Handlebars.registerPartial('icon-avatar', avatarIcon);
Handlebars.registerPartial('profile-page', profilePageTemplate); 
Handlebars.registerPartial('profile', profileTemplate); 
Handlebars.registerPartial('profile-item', profileItem); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(profileTemplate)({});

entryNode.innerHTML = compiledTemplate; 
