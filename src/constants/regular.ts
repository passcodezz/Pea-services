/* eslint-disable no-useless-escape */
export class RegExs {
  static readonly PASSWORD = new RegExp(/^(?=.*\w)(?=.{6,})/);

  static readonly PASSWORD_ENG = new RegExp(
    /^(?=.*[a-zA-Z0-9])[^\u0E00-\u0E7F]+$/
  );

  static readonly EMAIL = new RegExp(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  );
  static readonly SETPASSWORD = new RegExp(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
  );
  static readonly UPPERCASE_CHAR = /[A-Z]/;
  static readonly LOWERCASE_CHAR = /[a-z]/;
  static readonly DIGIT = /[0-9]/;
  static readonly SPECIAL_CHAR = /[!@#$%^&*]/;
}