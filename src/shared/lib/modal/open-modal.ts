import { store } from '@/shared/store';

export function openModal(name: string, props?: Record<string, unknown>) {
  store.setState('ui.modal', {
    name,
    props,
  });
}
