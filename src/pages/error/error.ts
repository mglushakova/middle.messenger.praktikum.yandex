import Handlebars from "handlebars";
import errorPageTemplate from "./error.hbs?raw";

Handlebars.registerPartial("error-page", errorPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(errorPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 