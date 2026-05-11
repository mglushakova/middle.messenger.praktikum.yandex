// import Handlebars from 'handlebars';
// import mainPageTemplate from './main.hbs?raw';
// import '@/styles/main.scss';
// import '@/pages/main/main.scss';

// Handlebars.registerPartial("main-page", mainPageTemplate);

// const entryNode = document.body;
// const compiledTemplate = Handlebars.compile(mainPageTemplate)({});

// entryNode.innerHTML = compiledTemplate;

import Form from "@/blocks/form/Form.ts";
import { Button } from "@/blocks/button/button";
import { Input } from "@/blocks/input/input";
import { registerComponent } from "@/helpers/registerComponent";

registerComponent(Button);
registerComponent(Input);

const form = new Form({
  label: "ok",
  onClick: () => console.log("click"),
});
const FormElement = form.element();

if (FormElement) {
  document.body.appendChild(FormElement);
}

form.setProps({ label: "Клик!" });
