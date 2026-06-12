import { Block, type BlockProps } from '@/shared/lib/block';
import './message.scss';

interface MessageProps extends BlockProps {
  content: string;
  time: string;
  formattedTime?: string;
  isOwn: boolean;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export class ChatMessage extends Block<MessageProps> {
  static componentName = 'ChatMessage';

  constructor(props: MessageProps) {
    super({
      ...props,
      formattedTime: formatTime(props.time),
    });
  }

  protected template = `
    <div class="message {{#if isOwn}}message_type_own{{/if}}">
      <div class="message__content">
        {{content}}
      </div>

      <div class="message__time">
        {{formattedTime}}
      </div>
    </div>
  `;
}
