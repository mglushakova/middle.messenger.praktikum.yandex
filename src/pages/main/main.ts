import Handlebars from 'handlebars';
import mainPageTemplate from './main.hbs?raw';
import '@/styles/main.scss';
import '@/styles/pages/main.scss';

Handlebars.registerPartial("main-page", mainPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(mainPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 