import Handlebars from "handlebars";
import loginPageTemplate from "./login.hbs?raw";
import '@/styles/main.scss';
import '@/styles/pages/login.scss';
import '@/styles/components/text-input.scss';
import '@/styles/components/button.scss';

Handlebars.registerPartial("login-page", loginPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(loginPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 