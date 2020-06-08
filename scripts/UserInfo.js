"use strict";

class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
    this.updateUserInfo();
  }

  getUserInfo = () => {
    return { name: this._name, about: this._about };
  };

  setUserInfo = ({ name, about }) => {
    this._name = name;
    this._about = about;
  };

  updateUserInfo = () => {
    document.querySelector(".user-info__name").textContent = this._name;
    document.querySelector(".user-info__job").textContent = this._about;
  };
}
