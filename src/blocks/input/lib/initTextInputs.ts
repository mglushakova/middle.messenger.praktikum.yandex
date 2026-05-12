export function initTextInputs(root: Document | HTMLElement = document) {
  const inputs = root.querySelectorAll<HTMLInputElement>('.input__input');

  inputs.forEach((input) => {
    const wrapper = input.closest('.input');

    if (!wrapper) return;

    const updateState = () => {
      if (input.value) {
        wrapper.classList.add('is-filled');
      } else {
        wrapper.classList.remove('is-filled');
      }
    };

    updateState();

    input.addEventListener('input', updateState);
  });
}
