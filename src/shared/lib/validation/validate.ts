import { validationRules } from './rules';

const validationMessages: Record<string, string> = {
  login:
    'Логин должен быть от 3 до 20 символов, латиница. Может содержать цифры, но не состоит только из них. Без пробелов, допустимы дефис и подчёркивание.',
  password:
    'Пароль должен быть от 8 до 40 символов, содержать заглавную букву и цифру',
  first_name:
    'Первая буква должна быть заглавной. Без пробелов и цифр, из спецсимволов — только дефис.',
  second_name:
    'Первая буква должна быть заглавной. Без пробелов и цифр, из спецсимволов — только дефис.',
  phone:
    'Телефон должен быть длиной от 10 до 15 символов. Можно использовать +',
  message: 'Заполните сообщение',
  email: 'Введите валидный email.',
};

export function validate(name: string, value: string): string | null {
  const rule = validationRules[name as keyof typeof validationRules];

  if (!rule) {
    return null;
  }

  return rule.test(value) ? null : validationMessages[name];
}
