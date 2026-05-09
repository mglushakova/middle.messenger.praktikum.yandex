import Block from '@/blocks/block/block.ts';
import {Button }  from '@/blocks/button/button';
import type {BlockOwnProps} from '@/blocks/block/block';

export default class Form extends Block<BlockOwnProps> {
  protected template = `
    <form>
      {{{ Input type="text" placeholder="Логин" ref="login" }}}
      {{{ Input type="password" placeholder="Пароль" ref="password" }}}

      <div data-auth-button></div>
      <div data-show-button></div>
    </form>
  `;

  private authButton = new Button({
    label: 'Авторизация',
    type: 'submit',
  });

  private handleShowText = () => {
    const loginInput = this.refs.login as HTMLInputElement;

    loginInput.value = 'Мой текст';
  };

  private showTextButton = new Button({
    label: 'Показать текст в инпуте',
    type: 'button',
    onClick: this.handleShowText,
  });

  protected componentDidMount(): void {
    this.element()
      ?.querySelector('[data-auth-button]')
      ?.replaceWith(this.authButton.element()!);

    this.element()
      ?.querySelector('[data-show-button]')
      ?.replaceWith(this.showTextButton.element()!);
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      console.log((this.refs.login as HTMLInputElement).value);
      console.log((this.refs.password as HTMLInputElement).value);
    },
  };
}
