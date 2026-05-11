import Handlebars from "handlebars";
import "@/styles/main.scss";
import "@/layout/error-page/error-page.scss";
import errorTemplate from "@/pages/error/error.hbs?raw";
import errorPageTemplate from "@/layout/error-page/error-page.hbs?raw";

Handlebars.registerPartial("error", errorTemplate);
Handlebars.registerPartial("error-page", errorPageTemplate);

const entryNode = document.body;
const compiledTemplate = Handlebars.compile(errorTemplate)({});

entryNode.innerHTML = compiledTemplate;
