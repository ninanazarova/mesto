"use strict";

class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }

  getUserInfo = () => {
    return { name: this._name, about: this._about };
  };

  setUserInfo = (name, about) => {
    this._name = name;
    this._about = about;
  };

  updateUserInfo = (form) => {
    const nameInput = form.elements.name.value;
    const aboutInput = form.elements.about.value;

    this.setUserInfo(nameInput, aboutInput);

    document.querySelector(".user-info__name").textContent = nameInput;
    document.querySelector(".user-info__job").textContent = aboutInput;
  };
}
