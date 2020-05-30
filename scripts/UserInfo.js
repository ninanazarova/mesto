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
    // берем значения полей
    const nameInput = form.elements.name.value;
    const aboutInput = form.elements.about.value;

    // отправляем их в setUserInfo
    this.setUserInfo(nameInput, aboutInput);

    // отрисовываем новые значения в разметке
    document.querySelector(".user-info__name").textContent = nameInput;
    document.querySelector(".user-info__job").textContent = aboutInput;
  };
}
