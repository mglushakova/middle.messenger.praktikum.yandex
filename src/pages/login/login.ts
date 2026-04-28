import Handlebars from "handlebars";
import loginPageTemplate from "./login.hbs?raw";
import '@/styles/main.scss';
import '@/pages/login/login.scss';
import '@/blocks/text-input/text-input.scss';
import '@/blocks/button/button.scss';
import { initTextInputs } from "../../blocks/text-input/text-input";
import textInput from "@/blocks/text-input/text-input.hbs?raw";

Handlebars.registerPartial("text-input", textInput);
Handlebars.registerPartial("login-page", loginPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(loginPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 

initTextInputs(entryNode);