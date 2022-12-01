export function isValidationEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === "" || email === "undefined") {
    return false;
  }
  return re.test(String(email).toLowerCase());
}

export function isValidEmail(value) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  return re.test(String(value).toLowerCase());
}

export function isName(name) {
  if (name === "" || typeof name === "undefined") {
    return false;
  } else {
    return true;
  }
}

export function isBlank(value) {
  return value === null || value.match(/^ *$/) !== null;
}

export function isValidAlphabet(value) {
  const re = /^[A-Z a-z]+$/;
  return re.test(value);
}

export function isValidPassword(value) {
  const re = /^(?=.*\d)(?=.*[A-Z]).{8,20}$/;
  if (value === "" || value === "undefined") {
    return false;
  }
  return re.test(value);
}

export function isValidAlNumber(value) {
  const re = /^[0-9]*$/;
  return re.test(value);
}

export function isValidContact(value) {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(value);
}

export function isValidIdNumber(value) {
  const re = /^[0-9]*$/;
  return re.test(value);
}
export function isValidName(value) {
  const re = /^\S*$/;
  return re.test(value);
}
