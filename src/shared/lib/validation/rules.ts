export const validationRules = {
  login: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,

  password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,

  new_password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,

  first_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,

  second_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,

  phone: /^\+?\d{10,15}$/,

  message: /^(?!\s*$).+/,

  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/,
};
