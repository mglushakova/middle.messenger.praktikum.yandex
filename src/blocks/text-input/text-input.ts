export function initTextInputs(root: Document | HTMLElement = document) {
  const inputs = root.querySelectorAll<HTMLInputElement>(".text-input__input");

  inputs.forEach((input) => {
    const wrapper = input.closest(".text-input");

    if (!wrapper) return;

    const updateState = () => {
      if (input.value) {
        wrapper.classList.add("is-filled");
      } else {
        wrapper.classList.remove("is-filled");
      }
    };

    updateState();

    input.addEventListener("input", updateState);
  });
}
