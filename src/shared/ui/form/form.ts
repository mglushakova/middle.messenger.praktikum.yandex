import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';
import template from './form.hbs?raw';
import './form.scss';

interface FormProps extends BlockProps {
  title?: string;
  buttonText?: string;
}

export class Form extends Block<FormProps> {
  static componentName = 'Form';

  protected template = template;

  protected events = {
    submit: (event: Event) => {
      console.log(event);
    },
  };
}
