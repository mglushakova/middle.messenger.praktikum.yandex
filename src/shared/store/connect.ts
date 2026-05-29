import type { Block, BlockProps } from '../lib/block';
import { isEqual } from '../lib/object/is-equal';
import type { Indexed } from '../types/indexed';
import store from './Store';

type BlockConstructor<P extends BlockProps> = new (props: P) => Block<P>;

export function connect<StateProps extends Indexed>(
  mapStateToProps: (state: Indexed) => StateProps,
) {
  return function <P extends BlockProps>(Component: BlockConstructor<P>) {
    return class extends Component {
      protected template: string = Component.prototype.template;

      constructor(props: P) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...(state as Partial<P>) });

        store.subscribe(() => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...(newState as Partial<P>) });
          }

          state = newState;
        });
      }
    };
  };
}
