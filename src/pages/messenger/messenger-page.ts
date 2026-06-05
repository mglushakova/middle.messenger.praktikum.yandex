import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

import './messenger-page.scss';
import { connect } from '@/shared/store';
import type { Chat } from '@/entities/chats/types';
import { chatsController } from '@/entities/chats';

interface MessengerPageProps extends BlockProps {
  selectedChat: Chat | null;
  chatsLoaded: boolean;
  chatsLoading: boolean;
}

const withSelectedChat = connect((state) => ({
  selectedChat: state.chats.selectedChat,
  chatsLoaded: state.chats.isLoaded,
  chatsLoading: state.chats.isLoading,
}));

class MessengerPageBase extends Block<MessengerPageProps> {
  static componentName = 'MessengerPage';

  protected template = `<main class="chat-page">
                          <aside class="chat-page__sidebar">
                            {{{ ChatList }}}
                          </aside>

                          <section class="chat-page__content">
                            {{#if selectedChat}}
                              {{{ ChatWindow }}}
                            {{else}}
                              <div class="chat-page__placeholder">
                                Выберите чат чтобы отправить сообщение
                              </div>
                            {{/if}}
                          </section>
                        </main>`;

  protected componentDidMount() {
    if (this.props.chatsLoaded || this.props.chatsLoading) {
      return;
    }

    chatsController.getChats();
  }
}

export const MessengerPage = withSelectedChat(MessengerPageBase);
