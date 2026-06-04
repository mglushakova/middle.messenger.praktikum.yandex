import { merge } from '../lib/object/merge';
import { set } from '../lib/object/set';
import type { AppState } from './types';

type Listener = () => void;

class Store<State extends Record<string, unknown>> {
  private state: State;
  private listeners: Set<Listener> = new Set();

  constructor(initialState: State) {
    this.state = initialState;
  }

  public getState(): State {
    return this.state;
  }

  public setState(path: string, value: unknown): void {
    this.state = merge(this.state, set({}, path, value)) as State;

    this.emit();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    // Возвращаем функцию для отписки
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }
}

const store = new Store<AppState>({
  user: null,
  auth: {
    error: null,
    isLoading: false,
  },
  profile: {
    error: null,
    isLoading: false,
  },
  chats: {
    items: [],
    error: null,
    isLoading: false,
  },
  ui: {
    modal: {
      name: null,
      props: {},
    },
  },
});

export default store;
