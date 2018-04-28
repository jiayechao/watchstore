export default class tools {
  static setItem(key, value, type) {
    if (key && value) {
      if (!type) return window.sessionStorage.setItem(key, JSON.stringify(value));
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getItem(key, type) {
    if (key) {
      if (!type) return JSON.parse(window.sessionStorage.getItem(key));
      return JSON.parse(window.localStorage.getItem(key));
    }
  }

  static removeItem(key, type) {
    if (key) {
      if (!type) return window.sessionStorage.removeItem(key);
      return window.localStorage.removeItem(key);
    }
  }
}
