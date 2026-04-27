import Handlebars from "handlebars";
import loginPageTemplate from "./login.hbs?raw";

Handlebars.registerPartial("login-page", loginPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(loginPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 