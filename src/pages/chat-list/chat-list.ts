import Handlebars from "handlebars";
import chatListPageTemplate from "./chat-list.hbs?raw";
import "../../styles/main.scss";

Handlebars.registerPartial("chat-list-page", chatListPageTemplate); 

const entryNode = document.body; 
const compiledTemplate = Handlebars.compile(chatListPageTemplate)({});

entryNode.innerHTML = compiledTemplate; 