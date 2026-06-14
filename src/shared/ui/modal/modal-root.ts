import { CreateChatModal } from '@/features/create-chat';
import { Block, type BlockProps } from '@/shared/lib/block/block';
import { connect } from '@/shared/store';
import type { ModalState } from '@/shared/store/types';
import './modal-root.scss';
import { AddUserToChatModal } from '@/features/add-user-to-chat';
import { RemoveUserFromChatModal } from '@/features/remove-user-from-chat';

type ModalComponent = new (props?: BlockProps) => Block<BlockProps>;

const registry: Record<string, ModalComponent> = {
  createChat: CreateChatModal,
  addUserToChat: AddUserToChatModal,
  removeUserFromChat: RemoveUserFromChatModal,
};
interface ModalRootProps extends BlockProps {
  modal: ModalState | null;
}

const withModal = connect((state) => ({
  modal: state.ui.modal,
}));

class ModalRootBase extends Block<ModalRootProps> {
  static componentName = 'ModalRoot';

  protected template = `
    <div class="modal-root__overlay"></div>
  `;

  protected componentDidMount() {
    this.updateModal();
  }

  public setProps(props: Partial<ModalRootProps>) {
    super.setProps(props);
    this.updateModal();
  }

  private updateModal() {
    const root = this.element();

    if (!root) {
      return;
    }

    root.replaceChildren();

    const modal = this.props.modal;

    if (!modal?.name) {
      root.classList.remove('modal-root__overlay_visible');
      return;
    }

    const Component = registry[modal.name];

    if (!Component) {
      return;
    }

    root.classList.add('modal-root__overlay_visible');

    const instance = new Component(
      (modal.props as BlockProps | undefined) ?? {},
    );

    const content = instance.element();

    if (content) {
      root.appendChild(content);
    }
  }
}

export const ModalRoot = withModal(ModalRootBase);
