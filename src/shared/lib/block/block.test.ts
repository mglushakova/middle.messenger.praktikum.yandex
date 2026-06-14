import { describe, it, expect } from 'vitest';
import { Block, type BlockProps } from './block';
import { registerComponent } from '../handlebars/registerComponent';

interface TestComponentProps extends BlockProps {
  content: string;
}

class TestComponent extends Block<TestComponentProps> {
  protected template = `
    <div>{{content}}</div>
  `;
}

describe('Block', () => {
  it('рендерит пропсы', () => {
    const component = new TestComponent({
      content: 'Hello world',
    } as BlockProps & { content: string });

    const element = component.element();

    expect(element?.innerHTML).toBe('Hello world');
  });

  it('делает ререндер после вызова setProps', () => {
    const component = new TestComponent({
      content: 'old value',
    });

    component.setProps({
      content: 'new value',
    });

    expect(component.element()?.innerHTML).toBe('new value');
  });
});

class ChildComponent extends Block<BlockProps> {
  static componentName = 'ChildComponent';
  protected template = `
    <span>Child</span>
  `;
}

registerComponent(ChildComponent);

class ParentComponent extends Block<BlockProps> {
  protected template = `
    <div data-child>{{{ ChildComponent }}}</div>
  `;
}

it('рендерит дочерний компонент', () => {
  const parent = new ParentComponent();

  const element = parent.element();

  expect(element?.textContent).toContain('Child');
});
