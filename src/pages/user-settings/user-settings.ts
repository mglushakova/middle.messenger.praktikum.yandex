import Handlebars from "handlebars";
import userSettingsPageTemplate from "./user-settings.hbs?raw";

Handlebars.registerPartial("user-settings-page", userSettingsPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(userSettingsPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 