import Handlebars from "handlebars";
import loginPageTemplate from "./login.hbs?raw";
import "@/styles/main.scss";
import "@/blocks/text-input/text-input.scss";
import "@/blocks/button/button.scss";
import formPageTemplate from "@/layout/form-page/form-page.hbs?raw";
import "@/layout/form-page/form-page.scss";
import formTemplate from "@/blocks/form/form.hbs?raw";
import "@/blocks/form/form.scss";
import { initTextInputs } from "../../blocks/text-input/text-input";
import textInput from "@/blocks/text-input/text-input.hbs?raw";

Handlebars.registerPartial("text-input", textInput);
Handlebars.registerPartial("form-page", formPageTemplate);
Handlebars.registerPartial("form", formTemplate);
Handlebars.registerPartial("login-page", loginPageTemplate);

const entryNode = document.body;
const compiledTemplate = Handlebars.compile(loginPageTemplate)({});

entryNode.innerHTML = compiledTemplate;

initTextInputs(entryNode);
