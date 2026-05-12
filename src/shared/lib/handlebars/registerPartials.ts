import Handlebars from 'handlebars';

import formPage from '@/shared/ui/form-page/form-page.hbs?raw';
import form from '@/shared/ui/form/form.hbs?raw';
import input from '@/shared/ui/input/input.hbs?raw';

export function registerPartials() {
  Handlebars.registerPartial('form-page', formPage);
  Handlebars.registerPartial('Form', form);
  Handlebars.registerPartial('Input', input);
}
