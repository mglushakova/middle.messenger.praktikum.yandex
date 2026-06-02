import type { AppState } from './types';
import type { Block, BlockProps } from '../lib/block';
import { isEqual } from '../lib/object/is-equal';
import store from './Store';

type BlockConstructor<P extends BlockProps> = {
  componentName: string;
  new (props?: P): Block<P>;
};

export function connect<StateProps extends Record<string, unknown>>(
  mapStateToProps: (state: AppState) => StateProps,
) {
  return function <P extends BlockProps>(Component: BlockConstructor<P>) {
    class ConnectedComponent extends Component {
      constructor(props: P) {
        let state = mapStateToProps(store.getState());

        super({
          ...props,
          ...state,
        } as P);

        store.subscribe(() => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps(newState as Partial<P>);
          }

          state = newState;
        });
      }
    }

    ConnectedComponent.componentName = Component.componentName;

    return ConnectedComponent;
  };
}
