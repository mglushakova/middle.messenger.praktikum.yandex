import Handlebars from 'handlebars';
import '@/styles/main.scss';
import '@/layout/error-page/error-page.scss';
import notFoundPageTemplate from './not-found.hbs?raw';
import errorPageTemplate from '@/layout/error-page/error-page.hbs?raw';

Handlebars.registerPartial("not-found-page", notFoundPageTemplate); 
Handlebars.registerPartial("error-page", errorPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(notFoundPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 