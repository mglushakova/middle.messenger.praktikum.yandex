import { validate } from './validate';

export function validateForm(form: HTMLFormElement): boolean {
  const inputs = form.querySelectorAll<HTMLInputElement>('input');

  let isValid = true;

  inputs.forEach((input) => {
    const value = input.value;

    let error = validate(input.name, value);

    if (input.name === 'password-confirm') {
      const passwordInput = form.querySelector<HTMLInputElement>(
        'input[name="password"]',
      );

      if (passwordInput?.value !== value) {
        error = 'Пароли не совпадают';
      }
    }

    if (error) {
      isValid = false;
    }
  });

  return isValid;
}
