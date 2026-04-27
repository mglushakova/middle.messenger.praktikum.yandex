import Handlebars from "handlebars";
import notFoundPageTemplate from "./not-found.hbs?raw";

Handlebars.registerPartial("not-found-page", notFoundPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(notFoundPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 