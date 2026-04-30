import Handlebars from 'handlebars';
import '@/styles/main.scss';
import '@/layout/profile-page/profile-page.scss';
import profileEditTemplate from './profile-edit.hbs?raw';
import profilePageTemplate from '@/layout/profile-page/profile-page.hbs?raw';
import '@/blocks/avatar/avatar-placeholder.scss';
import profileFormTemplate from '@/blocks/profile-form/profile-form.hbs?raw';
import '@/blocks/profile-form/profile-form.scss';
import profileInputTemplate from '@/blocks/profile-input/profile-input.hbs?raw';
import '@/blocks/profile-input/profile-input.scss';
import avatarIcon from '@/blocks/avatar/avatar-placeholder.hbs?raw';
import '@/blocks/avatar/avatar-placeholder.scss';
import './profile-edit.scss';

Handlebars.registerPartial('profile-page', profilePageTemplate); 
Handlebars.registerPartial('profile-edit', profileEditTemplate); 
Handlebars.registerPartial('profile-form', profileFormTemplate); 
Handlebars.registerPartial('profile-input', profileInputTemplate); 
Handlebars.registerPartial('avatar-icon', avatarIcon); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(profileEditTemplate)({});

entryNode.innerHTML = compiledTemplate; 