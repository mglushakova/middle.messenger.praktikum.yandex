import Handlebars from "handlebars";
import registerPageTemplate from "./register.hbs?raw";

Handlebars.registerPartial("register-page", registerPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(registerPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 