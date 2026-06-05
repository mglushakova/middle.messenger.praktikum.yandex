import { merge } from '../lib/object/merge';
import { set } from '../lib/object/set';
import type { AppState } from './types';

type Listener = () => void;

const initialState: AppState = {
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
    selectedChat: null,
    error: null,
    isLoading: false,
    isLoaded: false,
  },
  ui: {
    modal: {
      name: null,
      props: {},
    },
  },
};

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

  public resetState() {
    this.state = merge({}, initialState) as State;
    this.emit();
  }
}

const store = new Store<AppState>(initialState);

export default store;
