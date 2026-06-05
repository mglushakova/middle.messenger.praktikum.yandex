import { store } from '@/shared/store';

export function closeModal() {
  store.setState('ui.modal', null);
}
