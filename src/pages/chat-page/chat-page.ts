import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

interface ChatPageProps extends BlockProps {
  isChatSelected: boolean;
}

export class ChatPage extends Block<ChatPageProps> {
  constructor() {
    super({
      isChatSelected: false,
    });
  }

  protected template = `<main class="chat-page">
                          <aside class="chat-page__sidebar">
                            {{{ ChatList }}}
                          </aside>

                          <section class="chat-page__content">
                            {{#if isChatSelected}}
                              {{{ ChatWindow }}}
                            {{else}}
                              <div class="chat-page__placeholder">
                                Выберите чат чтобы отправить сообщение
                              </div>
                            {{/if}}
                          </section>
                        </main>`;

  protected events = {
    click: (event: Event) => {
      const target = event.target as HTMLElement;

      const chatItem = target.closest('.chat-item');

      if (!chatItem) {
        return;
      }

      this.setProps({
        isChatSelected: true,
      });
    },
  };
}
