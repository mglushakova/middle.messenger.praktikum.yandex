import template from './main.hbs?raw';
import './main.scss';
import { Block, type BlockProps } from '@/shared/lib/block';

export class MainPage extends Block<BlockProps> {
  protected template = template;
}
