import { Block, type BlockProps } from '@/shared/lib/block';
import authController from '../auth-controller';

export class LogoutLink extends Block<BlockProps> {
  static componentName = 'LogoutLink';

  protected template = `
    <a href="#" class="link link_size_medium link_type_danger">
      Выйти
    </a>
  `;

  protected events = {
    click: () => {
      void authController.logout();
    },
  };
}
