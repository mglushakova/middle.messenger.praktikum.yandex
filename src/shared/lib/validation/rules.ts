export const validationRules = {
  login: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,

  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{8,40}$/,
};
