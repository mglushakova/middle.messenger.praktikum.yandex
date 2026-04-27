import Handlebars from "handlebars";
import mainPageTemplate from "./main.hbs?raw";

Handlebars.registerPartial("main-page", mainPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(mainPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 