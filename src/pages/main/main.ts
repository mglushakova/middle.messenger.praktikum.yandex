import Handlebars from 'handlebars';
import mainPageTemplate from './main.hbs?raw';
import '@/styles/main.scss';
import '@/pages/main/main.scss';

Handlebars.registerPartial("main-page", mainPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(mainPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 
