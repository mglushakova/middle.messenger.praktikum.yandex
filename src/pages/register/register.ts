import Handlebars from 'handlebars';
import registerPageTemplate from './register.hbs?raw';
import '@/styles/main.scss';
import '@/blocks/input/input.scss';
import '@/blocks/button/button.scss';
import formPageTemplate from '@/layout/form-page/form-page.hbs?raw';
import '@/layout/form-page/form-page.scss';
import formTemplate from '@/blocks/form/form.hbs?raw';
import '@/blocks/form/form.scss';
import { initTextInputs } from '../../blocks/input/input';
import textInput from '@/blocks/input/input.hbs?raw';

Handlebars.registerPartial('input', textInput);
Handlebars.registerPartial('form-page', formPageTemplate);
Handlebars.registerPartial('form', formTemplate);
Handlebars.registerPartial('register-page', registerPageTemplate);

const entryNode = document.body;
const compiledTemplate = Handlebars.compile(registerPageTemplate)({});

entryNode.innerHTML = compiledTemplate;

initTextInputs(entryNode);
