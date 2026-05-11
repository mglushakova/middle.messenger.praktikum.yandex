import Handlebars from "handlebars";
import chatPageTemplate from "./chat-page.hbs?raw";
import "@/styles/main.scss";
import "./chat-page.scss";
import chatList from "@/blocks/chat-list/chat-list.hbs?raw";
import "@/blocks/chat-list/chat-list.scss";
import chatItem from "@/blocks/chat-item/chat-item.hbs?raw";
import "@/blocks/chat-item/chat-item.scss";
import chatWindow from "@/blocks/chat-window/chat-window.hbs?raw";
import "@/blocks/chat-window/chat-window.scss";
import messageInput from "@/blocks/message-input/message-input.hbs?raw";
import "@/blocks/message-input/message-input.scss";

Handlebars.registerPartial("chat-page", chatPageTemplate);
Handlebars.registerPartial("chat-list", chatList);
Handlebars.registerPartial("chat-item", chatItem);
Handlebars.registerPartial("chat-window", chatWindow);
Handlebars.registerPartial("message-input", messageInput);

const entryNode = document.body;
const compiledTemplate = Handlebars.compile(chatPageTemplate)({
  isChatSelected: true,
});

entryNode.innerHTML = compiledTemplate;
